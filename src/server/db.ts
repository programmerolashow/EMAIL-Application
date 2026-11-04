import { env } from "@/env";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * pg currently treats sslmode=prefer/require/verify-ca as verify-full and warns that this will
 * change (weaker libpq semantics) in pg v9. Pin the current, stricter behaviour explicitly so the
 * connection stays fully verified and the warning goes away. Neon's certificates verify fine.
 */
const normalizeConnectionString = (raw: string): string => {
  try {
    const url = new URL(raw);
    const mode = url.searchParams.get("sslmode");
    if (mode && ["prefer", "require", "verify-ca"].includes(mode)) {
      url.searchParams.set("sslmode", "verify-full");
    }
    return url.toString();
  } catch {
    return raw;
  }
};

const createPrismaClient = () => {
  const pool = new Pool({ connectionString: normalizeConnectionString(env.DATABASE_URL) });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
