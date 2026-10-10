import { SITE } from "@/config/site.config";
import { destinations } from "@/data/redirects";

// Keyboard shortcuts, shown in the "?" panel and handled in Interactions.astro.
export default [
  { key: "d", label: "toggle theme", action: "theme" },
  { key: "e", label: "copy email", action: "copy" },
  { key: "g", label: "github", action: "open", href: destinations.github },
  { key: "l", label: "linkedin", action: "open", href: destinations.linkedin },
  { key: "x", label: "x / twitter", action: "open", href: destinations.twitter },
  { key: "r", label: "resume", action: "open", href: destinations.resume },
  { key: "w", label: "writing", action: "open", href: SITE.blogUrl },
  { key: "t", label: "back to top", action: "top" },
  { key: "?", label: "show shortcuts", action: "help" },
] as const;
