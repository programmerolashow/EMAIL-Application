import "server-only";
import type { CommunicationProvider } from "./types";
import { NylasCommunicationProvider } from "./nylas-provider";

export * from "./types";
export * from "./nylas-provider";

/**
 * Factory function to obtain a CommunicationProvider instance for a given account access token.
 * Hides provider-specific implementation details (e.g. Nylas vs direct APIs) from application callers.
 */
export function getCommunicationProvider(accessToken: string): CommunicationProvider {
  return new NylasCommunicationProvider(accessToken);
}
