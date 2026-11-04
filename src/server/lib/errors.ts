import "server-only";
import type { TRPCError } from "@trpc/server";

type TRPC_ERROR_CODE_KEY = ConstructorParameters<typeof TRPCError>[0]["code"];

/**
 * An error whose message is written for the end user. Anything thrown as a UserFacingError is
 * shown verbatim in the UI; everything else is reported with a generic message plus logs.
 */
export class UserFacingError extends Error {
  readonly code: TRPC_ERROR_CODE_KEY;

  constructor(message: string, code: TRPC_ERROR_CODE_KEY = "BAD_REQUEST", options?: { cause?: unknown }) {
    super(message, options);
    this.name = "UserFacingError";
    this.code = code;
  }
}

/** Error returned by the Nylas API, carrying Nylas' own message, type and request id. */
export class NylasApiError extends UserFacingError {
  readonly status: number;
  readonly nylasType?: string;
  readonly nylasMessage: string;
  readonly requestId?: string;

  constructor(status: number, nylasMessage: string, nylasType?: string, requestId?: string) {
    super(describeNylasError(status, nylasMessage, nylasType), codeForStatus(status));
    this.name = "NylasApiError";
    this.status = status;
    this.nylasType = nylasType;
    this.nylasMessage = nylasMessage;
    this.requestId = requestId;
  }

  /** True when the grant itself is unusable and the user must reconnect the mailbox. */
  get isGrantInvalid(): boolean {
    return (
      this.status === 401 ||
      this.status === 403 ||
      (this.status === 404 && /grant/i.test(`${this.nylasType ?? ""} ${this.nylasMessage}`))
    );
  }

  /** Parses a failed Nylas response body (`{ request_id, error: { type, message } }`). */
  static fromResponse(status: number, statusText: string, body: string): NylasApiError {
    let message = statusText || `HTTP ${status}`;
    let type: string | undefined;
    let requestId: string | undefined;
    try {
      const parsed = JSON.parse(body) as {
        request_id?: string;
        error?: { type?: string; message?: string } | string;
        message?: string;
      };
      requestId = parsed.request_id;
      if (typeof parsed.error === "object" && parsed.error) {
        message = parsed.error.message ?? message;
        type = parsed.error.type;
      } else if (typeof parsed.error === "string") {
        message = parsed.error;
      } else if (parsed.message) {
        message = parsed.message;
      }
    } catch {
      if (body.trim()) message = body.trim().slice(0, 300);
    }
    return new NylasApiError(status, message, type, requestId);
  }
}

function codeForStatus(status: number): TRPC_ERROR_CODE_KEY {
  if (status === 401) return "UNAUTHORIZED";
  if (status === 403) return "FORBIDDEN";
  if (status === 404) return "NOT_FOUND";
  if (status === 429) return "TOO_MANY_REQUESTS";
  if (status >= 500) return "BAD_GATEWAY";
  return "BAD_REQUEST";
}

/** Plain-language explanation followed by Nylas' actual error message. */
function describeNylasError(status: number, message: string, type?: string): string {
  const detail = `(Nylas: ${message})`;
  if (status === 401 || status === 403 || type === "token.unauthorized_access") {
    return `This mailbox's connection is no longer valid, so it has to be reconnected. ${detail}`;
  }
  if (status === 404) {
    return `The requested email, folder or mailbox no longer exists. ${detail}`;
  }
  if (status === 429) {
    return `Your mail provider is rate-limiting requests right now. Wait a minute and try again. ${detail}`;
  }
  if (status >= 500) {
    return `Your mail provider is temporarily unavailable. Try again shortly. ${detail}`;
  }
  return `The mail provider rejected the request. ${detail}`;
}

/** Message safe to show the user for any thrown value. */
export function userMessage(error: unknown, fallback: string): string {
  if (error instanceof UserFacingError) return error.message;
  if (error instanceof Error && /fetch failed|ENOTFOUND|ECONNRESET|ETIMEDOUT/i.test(error.message)) {
    return "Couldn't reach the mail service. Check your connection and try again.";
  }
  return fallback;
}

/**
 * Re-throws UserFacingErrors unchanged and wraps anything else with a user-safe message
 * (the original stays attached as `cause` and is logged by the caller).
 */
export function toUserFacing(error: unknown, fallback: string): UserFacingError {
  if (error instanceof UserFacingError) return error;
  return new UserFacingError(userMessage(error, fallback), "INTERNAL_SERVER_ERROR", { cause: error });
}
