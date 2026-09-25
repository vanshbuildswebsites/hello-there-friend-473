import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/category-page";

export const Route = createFileRoute("/seating")({
  head: categoryHead("seating"),
  component: () => <CategoryPage k="seating" />,
});
