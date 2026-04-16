import { env } from "@/env";
import { PrismaClient } from "../../generated/prisma";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const createPrismaClient = () => {
  const connectionString = env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    adapter,
    log:
      env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
