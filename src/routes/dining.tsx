import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage, categoryHead } from "@/components/category-page";

export const Route = createFileRoute("/dining")({
  head: categoryHead("dining"),
  component: () => <CategoryPage k="dining" />,
});
