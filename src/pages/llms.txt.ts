import type { APIRoute } from "astro";
import { SITE } from "@/config/site.config";
import profile from "@/data/profile";
import work from "@/data/work";
import techStack from "@/data/TechStack";

const text = (body: string) =>
  new Response(`${body.trim()}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });

const siteUrl = () => new URL(`${SITE.protocol}://${SITE.domain}`).origin;

const normalizeText = (value: string) =>
  value
    .replaceAll("\u2014", "-")
    .replaceAll("\u2049\ufe0f", "?!")
    .trim();

const markdownList = (items: string[]) =>
  items.map((item) => `- ${normalizeText(item)}`).join("\n");

export const GET: APIRoute = () => {
  const origin = siteUrl();
  const featuredProjects = work
    .slice(0, 4)
    .map((project) => `${project.title}: ${project.description}`);
  const skills = techStack.map(
    (group) => `${group.category}: ${group.items.map((item) => item.name).join(", ")}`,
  );

  return text(`
# ${SITE.title}

> ${profile.title}. ${profile.description}

${SITE.description}

## Canonical URLs
${markdownList([
  `Website: ${origin}/`,
  `Full LLM context: ${origin}/llms-full.txt`,
  `GitHub: ${origin}/github`,
  `LinkedIn: ${origin}/linkedin`,
  `Resume: ${origin}/resume`,
])}

## Featured Work
${markdownList(featuredProjects)}

## Technical Focus
${markdownList(skills)}
  `);
};
