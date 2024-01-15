import { defineConfig } from "astro/config";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";

import sanity from "@sanity/astro";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  scopedStyleStrategy: "class",
  image: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.sanity.io",
      },
    ],
  },
  // redirects: {
  //   "/fellows/2024": "/fellows?year=2024",
  //   "/fellows/2025": "/fellows?year=2025",
  // },
  integrations: [
    svelte(),
    sanity({
      projectId: "7zni91yt",
      dataset: "production",
      useCdn: "false",
    }),
  ],
  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist(">= 0.25%")),
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
});
