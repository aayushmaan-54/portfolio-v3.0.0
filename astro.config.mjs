import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

const localEnv = loadEnv(
  process.env.NODE_ENV || "development",
  process.cwd(),
  "",
);

const PUBLIC_PROTOCOL = process.env.PUBLIC_PROTOCOL || localEnv.PUBLIC_PROTOCOL;
const PUBLIC_DOMAIN = process.env.PUBLIC_DOMAIN || localEnv.PUBLIC_DOMAIN;

export default defineConfig({
  site: `${PUBLIC_PROTOCOL}://${PUBLIC_DOMAIN}`,
  output: "static",

  build: {
    inlineStylesheets: "always",
  },

  devToolbar: {
    enabled: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon()],

  fonts: [
    {
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      provider: fontProviders.fontsource(),
    },
    {
      name: "Silkscreen",
      cssVariable: "--font-silkscreen",
      provider: fontProviders.fontsource(),
    },
  ],

  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      DATABUDDY_CLIENT_ID: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
      PUBLIC_PROTOCOL: envField.string({
        access: "public",
        context: "client",
      }),
      PUBLIC_DOMAIN: envField.string({
        access: "public",
        context: "client",
      }),
      PUBLIC_BLOG_URL: envField.string({
        access: "public",
        context: "client",
      }),
    },
  },

  adapter: cloudflare(),
});