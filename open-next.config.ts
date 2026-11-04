import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({});

export default {
  ...config,
  // `npm run build` is the Cloudflare build itself (so Workers Builds' default command works);
  // OpenNext runs the plain Next.js build through this script.
  buildCommand: "npm run build:next",
};
