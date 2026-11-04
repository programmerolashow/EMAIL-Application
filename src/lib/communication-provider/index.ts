import "server-only";
import type { CommunicationProvider } from "./types";
import { NylasCommunicationProvider } from "./nylas-provider";

export * from "./types";
export * from "./nylas-provider";

/**
 * Factory function to obtain a CommunicationProvider for a connected account.
 * For Nylas the account is addressed by its grant id (which is also the Account row id).
 * Hides provider-specific implementation details (e.g. Nylas vs direct APIs) from application callers.
 */
export function getCommunicationProvider(grantId: string): CommunicationProvider {
  return new NylasCommunicationProvider(grantId);
}
