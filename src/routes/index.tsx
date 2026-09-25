import { createFileRoute } from "@tanstack/react-router";
import { FurnitureSite } from "@/components/furniture-site";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Home Style Furniture Mart | Furniture for Better Living" },
    { name: "description", content: "Explore stylish sofas, beds, dining sets, wardrobes and custom furniture at Home Style Furniture Mart." },
    { property: "og:title", content: "Home Style Furniture Mart | Furniture for Better Living" },
    { property: "og:description", content: "Quality furniture, modern designs and trusted local service for every room in your home." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: FurnitureSite,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
