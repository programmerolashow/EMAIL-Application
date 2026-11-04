import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Mail is always read live from Nylas, so no incremental cache is needed.
export default defineCloudflareConfig({});
