import type { APIRoute } from "astro";
import { SITE } from "@/config/site.config";
import profile from "@/data/profile";
import work from "@/data/work";
import experience from "@/data/experience";
import education from "@/data/education";
import credentials from "@/data/credentials";
import techStack from "@/data/TechStack";
import redirects from "@/data/redirects";

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
    .replaceAll("\u2192", "->")
    .replaceAll("\u2049\ufe0f", "?!")
    .trim();

const markdownList = (items: string[]) =>
  items.filter(Boolean).map((item) => `- ${normalizeText(item)}`).join("\n");

const externalLinks = Object.entries(redirects)
  .filter(([slug]) =>
    ["github", "linkedin", "resume", "gmail"].includes(slug),
  )
  .map(([slug, href]) => `${slug}: ${href}`);

export const GET: APIRoute = () => {
  const origin = siteUrl();

  return text(`
# ${SITE.title}

## Overview
${profile.name} is a ${profile.title}.

${profile.description}

Site description: ${SITE.description}
Language: ${SITE.lang}
Timezone: ${SITE.timezone}
Canonical website: ${origin}/

## Important URLs
${markdownList([
  `Home: ${origin}/`,
  `Concise LLM context: ${origin}/llms.txt`,
  `Robots policy: ${origin}/robots.txt`,
  ...externalLinks,
])}

## Work
${work
  .map((project) =>
    [
      `### ${project.title}`,
      project.inProgress ? "Status: in progress" : "",
      project.description,
      `Stack: ${project.stack.join(", ")}`,
      project.github ? `GitHub: ${project.github}` : "",
      project.demo ? `Demo: ${project.demo}` : "",
      "npm" in project && project.npm ? `NPM: ${project.npm}` : "",
    ]
      .filter(Boolean)
      .map((line) => normalizeText(line))
      .join("\n"),
  )
  .join("\n\n")}

## Experience
${experience
  .map((item) =>
    [
      `### ${item.role} at ${item.company}`,
      `Location: ${item.location}`,
      `Duration: ${item.duration}`,
      item.current ? "Current role: yes" : "Current role: no",
      ...item.description,
    ]
      .map((line) => normalizeText(line))
      .join("\n"),
  )
  .join("\n\n")}

## Education
${education
  .map((item) =>
    [
      `### ${item.degree}`,
      `Institution: ${item.institution}`,
      `Location: ${item.location}`,
      `Duration: ${item.duration}`,
      `Affiliation: ${item.affiliation}`,
      `Field: ${item.field}`,
    ]
      .map((line) => normalizeText(line))
      .join("\n"),
  )
  .join("\n\n")}

## Credentials
${credentials
  .map((item) =>
    [
      `### ${item.title}`,
      `Issuer: ${item.issuer}`,
      `Verification: ${item.verifyUrl}`,
    ]
      .map((line) => normalizeText(line))
      .join("\n"),
  )
  .join("\n\n")}

## Technical Stack
${techStack
  .map((group) => `### ${group.category}\n${markdownList(group.items.map((item) => item.name))}`)
  .join("\n\n")}
  `);
};
