import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import icon from "astro-icon";

const { PUBLIC_PROTOCOL, PUBLIC_DOMAIN } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

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
    },
  },
});
