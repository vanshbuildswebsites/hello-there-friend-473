import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/category-page";

export const Route = createFileRoute("/exterior")({
  head: categoryHead("exterior"),
  component: () => <CategoryPage k="exterior" />,
});
