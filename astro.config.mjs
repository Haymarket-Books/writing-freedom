// @ts-check
import { defineConfig } from "astro/config";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
import sitemap from "@astrojs/sitemap";

// troubleshoot: some settings not updating?
// https://astro.build/config
export default defineConfig({
  site: "https://writing-freedom.org",
  image: {
    domains: ["cdn.sanity.io"]
  },
  integrations: [
    sitemap(),
  ],
  prefetch: {
    prefetchAll: true
  },
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist("defaults")),
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
});
