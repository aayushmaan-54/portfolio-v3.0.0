import type { APIRoute } from "astro";
import { SITE } from "@/config/site.config";
import profile from "@/data/profile";
import work from "@/data/work";
import experience from "@/data/experience";
import education from "@/data/education";
import credentials from "@/data/credentials";
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
    .replaceAll("\u2014", "-")
    .replaceAll("\u2192", "->")
    .replaceAll("\u2049\ufe0f", "?!")
    .trim();

const markdownList = (items: string[]) =>
  items
    .filter(Boolean)
    .map((item) => `- ${normalizeText(item)}`)
    .join("\n");

const isUrl = (value: string) => /^(https?:\/\/|mailto:)/.test(value);

const mdLink = (label: string, href: string, description?: string) =>
  `[${normalizeText(label).replaceAll("[", "(").replaceAll("]", ")")}](${href})` +
  (description ? ` - ${normalizeText(description)}` : "");

const externalLinks = (
  [
    ["GitHub", destinations.github],
    ["LinkedIn", destinations.linkedin],
    ["Resume", destinations.resume],
    ["Email", destinations.gmail],
  ] as const
)
  .filter(([, href]) => isUrl(href))
  .map(([label, href]) => mdLink(label, href));

export const GET: APIRoute = () => {
  const origin = siteUrl();
  const blog = import.meta.env.PUBLIC_BLOG_URL;

  return text(`
# ${SITE.title}

> ${normalizeText(profile.title)}. ${normalizeText(profile.description)}

## Overview
${profile.name} is a ${profile.title}.

Site description: ${normalizeText(SITE.description)}
Language: ${SITE.lang}
Timezone: ${SITE.timezone}
Canonical website: ${mdLink(`${SITE.domain}`, `${origin}/`)}

## Important URLs
${markdownList([
  mdLink("Home", `${origin}/`),
  mdLink("Concise LLM context", `${origin}/llms.txt`),
  mdLink("Robots policy", `${origin}/robots.txt`),
  isUrl(blog) ? mdLink("Blog", blog) : "",
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
      (() => {
        const links = [
          project.github && mdLink("GitHub", project.github),
          project.demo && mdLink("Demo", project.demo),
          "npm" in project && project.npm && mdLink("npm", project.npm),
        ].filter(Boolean);
        return links.length ? `Links: ${links.join(", ")}` : "";
      })(),
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
      `Verification: ${mdLink("Verify badge", item.verifyUrl)}`,
    ]
      .map((line) => normalizeText(line))
      .join("\n"),
  )
  .join("\n\n")}

## Technical Stack
${techStack
  .map(
    (group) =>
      `### ${group.category}\n${markdownList(group.items.map((item) => item.name))}`,
  )
  .join("\n\n")}
  `);
};
