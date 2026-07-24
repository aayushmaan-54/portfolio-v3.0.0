# portfolio
My personal site. Astro, Tailwind, no client-side framework — static output, one real page.

## Running it
Needs Node 22.12+.

```sh
npm install
cp .env.example .env
npm run dev
```

`npm run build` writes to `dist/`, `npm run preview` serves that build.

## Environment
`PUBLIC_PROTOCOL`, `PUBLIC_DOMAIN` and `PUBLIC_BLOG_URL` are required — they're declared in
`astro.config.mjs`, so the build fails outright if one is missing rather than shipping something
broken. `PUBLIC_GOOGLE_SITE_VERIFICATION` and `DATABUDDY_CLIENT_ID` are optional; empty just means
the tag isn't rendered.

`PUBLIC_PROTOCOL` + `PUBLIC_DOMAIN` compose every canonical URL, `og:url` and sitemap entry, so in
production they must be `https` and the real domain. `PUBLIC_DOMAIN` is a bare host — no protocol,
no trailing slash. `src/config/site.config.ts` checks the shape and throws if it's wrong.

## Content
All of it lives in `src/data/` — `profile`, `work`, `experience`, `education`, `credentials`,
`TechStack`, `socials`, `redirects`. Components don't hold copy, so editing the site means editing
data.

## Blog posts
The writing section fetches `$PUBLIC_BLOG_URL/api/posts.json` at build time and shows the latest
three. If the blog is unreachable the section renders empty instead of failing the build. Posts only
appear after a rebuild, so the blog's deploy should trigger one here.

## Short links
`src/data/redirects.ts` generates a page per slug — `/github`, `/linkedin`, `/x`, `/twitter`, `/cv`,
`/resume`, `/gmail`, `/email`. Each shows a brief interstitial, then redirects. Add a slug and the
route exists on the next build.

## Generated routes
`/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml` are all built from `src/data`. Nothing
to hand-edit.

## Stack
Astro, Tailwind CSS, astro-icon (Devicons), Fontsource (Silkscreen, Geist Mono), sharp.
