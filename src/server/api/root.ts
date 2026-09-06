import { accountRouter } from "@/server/api/routers/account";
import { aiRouter } from "@/server/api/routers/ai";
import { mailRouter } from "@/server/api/routers/mail";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  account: accountRouter,
  ai: aiRouter,
  mail: mailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
