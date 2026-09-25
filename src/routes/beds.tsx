import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/category-page";

export const Route = createFileRoute("/beds")({
  head: categoryHead("beds"),
  component: () => <CategoryPage k="beds" />,
});
