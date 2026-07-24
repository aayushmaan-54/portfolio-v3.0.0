import type { APIRoute } from "astro";
import { SITE } from "@/config/site.config";
import profile from "@/data/profile";
import work from "@/data/work";
import techStack from "@/data/TechStack";
import { destinations } from "@/data/redirects";

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
    .replaceAll("—", "-")
    .replaceAll("→", "->")
    .replaceAll("⁉️", "?!")
    .trim();

const isUrl = (value: string) => /^(https?:\/\/|mailto:)/.test(value);

const mdLink = (label: string, href: string, description?: string) =>
  `- [${normalizeText(label).replaceAll("[", "(").replaceAll("]", ")")}](${href})` +
  (description ? `: ${normalizeText(description)}` : "");

export const GET: APIRoute = () => {
  const origin = siteUrl();
  const blog = import.meta.env.PUBLIC_BLOG_URL;

  const urls = [
    mdLink("Portfolio", `${origin}/`, SITE.description),
    mdLink(
      "Full LLM context",
      `${origin}/llms-full.txt`,
      "Complete structured profile: work, experience, education, credentials, stack",
    ),
    isUrl(blog) && mdLink("Blog", blog, "Long-form technical writing"),
    isUrl(destinations.github) &&
      mdLink("GitHub", destinations.github, "Source for the projects below"),
    isUrl(destinations.linkedin) &&
      mdLink("LinkedIn", destinations.linkedin, "Professional profile"),
    isUrl(destinations.resume) &&
      mdLink("Resume", destinations.resume, "Current CV"),
    isUrl(destinations.gmail) &&
      mdLink("Email", destinations.gmail, "Direct contact"),
  ].filter(Boolean);

  const projects = work.map((project) => {
    const href =
      project.demo || project.github || ("npm" in project && project.npm);
    return href
      ? mdLink(project.title, href as string, project.description)
      : `- ${normalizeText(project.title)}: ${normalizeText(project.description)}`;
  });

  const skills = techStack.map(
    (group) =>
      `- ${group.category}: ${group.items.map((item) => item.name).join(", ")}`,
  );

  return text(`
# ${SITE.title}

> ${normalizeText(profile.title)}. ${normalizeText(profile.description)}

${normalizeText(SITE.description)}

## Canonical URLs

${urls.join("\n")}

## Featured Work

${projects.join("\n")}

## Technical Focus

${skills.join("\n")}
  `);
};
