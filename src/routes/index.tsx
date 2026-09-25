import { createFileRoute } from "@tanstack/react-router";
import { FurnitureSite } from "@/components/furniture-site";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Home Style Furniture Mart | Furniture Showroom in Khatima" },
    { name: "description", content: "Sofas, beds, dining sets, seating, lighting and décor at Home Style Furniture Mart, SH 29, Khatima, Uttarakhand." },
    { property: "og:title", content: "Home Style Furniture Mart | Furniture Showroom in Khatima" },
    { property: "og:description", content: "Make room for better living — visit our furniture showroom in Khatima." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: FurnitureSite,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
