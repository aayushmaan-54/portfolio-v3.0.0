export const destinations = {
  github: "https://github.com/aayushmaan-54",
  linkedin: "https://www.linkedin.com/in/aayushmaan54/",
  twitter: "https://x.com/aayushmaan5oni",
  resume:
    "https://drive.google.com/file/d/1F8O0d-i40No1dF-k7Q9tmkEQ3HycUn1v/view?usp=sharing",
  gmail: "mailto:hello@aayushmaansoni.com",
} as const;

const aliases: Record<string, keyof typeof destinations> = {
  github: "github",
  linkedin: "linkedin",
  x: "twitter",
  twitter: "twitter",
  cv: "resume",
  resume: "resume",
  gmail: "gmail",
  email: "gmail",
};

const redirects: Record<string, string> = Object.fromEntries(
  Object.entries(aliases).map(([slug, key]) => [slug, destinations[key]]),
);

export default redirects;
