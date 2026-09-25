import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/category-page";

export const Route = createFileRoute("/sofas")({
  head: categoryHead("sofas"),
  component: () => <CategoryPage k="sofas" />,
});
