const domain: string = import.meta.env.PUBLIC_DOMAIN;
const protocol: string = import.meta.env.PUBLIC_PROTOCOL;
const blogUrl: string = import.meta.env.PUBLIC_BLOG_URL ?? "";

export const SITE = {
  domain,
  protocol,
  blogUrl,
  author: "aayushmaan soni",
  profile: "https://www.aayushmaansoni.com",
  title: "Aayushmaan Soni",
  tagline: "Software Engineer",
  description:
    "Aayushmaan Soni — software engineer working across web apps and cloud infrastructure. Projects, experience, tech stack, and writing.",
  ogImage: "og.png",
  lightAndDarkMode: true,
  browserStorage: {
    backUrl: "ams/portfolio/back-url",
    theme: "ams/portfolio/theme",
  },
  dir: "ltr", // "rtl" | "auto",
  lang: "en",
  timezone: "Asia/Kolkata", // Timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  twitterHandle: "@aayushmaan5oni",
} as const;
