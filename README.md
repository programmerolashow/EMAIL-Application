# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Deploying to Cloudflare Workers

The app runs on Cloudflare Workers through [OpenNext](https://opennext.js.org/cloudflare).

1. `npx wrangler login`
2. Put the secrets on the Worker (one time):
   ```
   npx wrangler secret put DATABASE_URL
   npx wrangler secret put NYLAS_CLIENT_ID
   npx wrangler secret put NYLAS_API_KEY
   npx wrangler secret put NYLAS_WEBHOOK_SECRET
   npx wrangler secret put OPENAI_API_KEY
   npx wrangler secret put NEXT_PUBLIC_SUPABASE_URL
   npx wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
   npx wrangler secret put NEXT_PUBLIC_APP_URL
   ```
   `NEXT_PUBLIC_*` values are also inlined at build time, so they must be in `.env` on the machine that runs the build.
3. `npm run deploy` builds and deploys. `npm run preview` runs the built Worker locally first.
4. After the first deploy, with `<url>` as the Worker URL:
   - Nylas dashboard → Hosted Authentication → add callback `<url>/api/nylas/callback`
   - Nylas dashboard → Webhooks → `<url>/api/webhooks/nylas` with the `message.*`, `thread.*`, `folder.*` and `grant.*` triggers. Copy the secret into `NYLAS_WEBHOOK_SECRET`.
   - Supabase → Auth → URL configuration → add `<url>` and `<url>/auth/callback`

The database client is created per request on Workers (`src/server/db.ts`), because Workers can't share a TCP socket between requests.
