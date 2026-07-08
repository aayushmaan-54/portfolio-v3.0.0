import type { APIRoute } from "astro";
import { SITE } from "@/config/site.config";

const text = (body: string) =>
  new Response(`${body.trim()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });

const siteUrl = () => new URL(`${SITE.protocol}://${SITE.domain}`).origin;

export const GET: APIRoute = () => {
  const origin = siteUrl();

  return text(`
User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
  `);
};
