import "server-only";
import type { CommunicationProvider } from "./types";
import { AurinkoCommunicationProvider } from "./aurinko-provider";

export * from "./types";
export * from "./aurinko-provider";

/**
 * Factory function to obtain a CommunicationProvider instance for a given account access token.
 * Hides provider-specific implementation details (e.g. Aurinko vs direct APIs) from application callers.
 */
export function getCommunicationProvider(accessToken: string): CommunicationProvider {
  return new AurinkoCommunicationProvider(accessToken);
}
