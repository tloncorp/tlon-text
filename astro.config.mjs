import { defineConfig } from "astro/config";
import { sanityIntegration } from "@sanity/astro";
import react from '@astrojs/react';

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://tlon.io",
  prefetch: true,
  integrations: [
    sanityIntegration({
      projectId: "4vy6phvk",
      dataset: "staging",
      useCdn: false,
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});