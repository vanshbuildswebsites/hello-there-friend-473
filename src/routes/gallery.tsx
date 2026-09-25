import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/category-page";

export const Route = createFileRoute("/gallery")({
  head: categoryHead("gallery"),
  component: () => <CategoryPage k="gallery" />,
});
