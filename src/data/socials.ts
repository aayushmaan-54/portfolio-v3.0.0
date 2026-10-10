import { destinations } from "@/data/redirects";

export default [
  {
    label: "github",
    href: "/github",
  },
  {
    label: "linkedin",
    href: "/linkedin",
  },
  {
    label: "x",
    href: "/x",
  },
  {
    label: "gmail",
    href: "/gmail",
    copy: destinations.gmail.replace(/^mailto:/, ""),
  },
];
