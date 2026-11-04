import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const createPrismaClient = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    // On Cloudflare Workers each request gets its own client, so a tiny pool is enough.
    max: isCloudflareWorker() ? 1 : 10,
    // Never hand a Workers socket to a later request.
    ...(isCloudflareWorker() ? { maxUses: 1 } : {}),
  });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

type Client = ReturnType<typeof createPrismaClient>;

function isCloudflareWorker() {
  return typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers";
}

/**
 * Cloudflare Workers forbid reusing a TCP socket opened by one request in another request
 * ("Cannot perform I/O on behalf of a different request"), so a module-level pg Pool breaks
 * there. On Workers we create one client per request, keyed on that request's
 * ExecutionContext; on Node (next dev / next start) we keep a single shared client.
 */
const perRequest = new WeakMap<object, Client>();
const globalForPrisma = globalThis as unknown as { prisma: Client | undefined };

function resolveClient(): Client {
  if (isCloudflareWorker()) {
    try {
      const { ctx } = getCloudflareContext();
      let client = perRequest.get(ctx);
      if (!client) {
        client = createPrismaClient();
        perRequest.set(ctx, client);
      }
      return client;
    } catch {
      // Outside a request (e.g. module init): fall through to a throwaway client.
      return createPrismaClient();
    }
  }
  return (globalForPrisma.prisma ??= createPrismaClient());
}

/** Drop-in Prisma client: `db.account.findMany(...)` resolves the right client per call. */
export const db = new Proxy({} as Client, {
  get(_target, prop) {
    const client = resolveClient();
    const value = Reflect.get(client, prop, client) as unknown;
    return typeof value === "function" ? (value as (...a: unknown[]) => unknown).bind(client) : value;
  },
});
