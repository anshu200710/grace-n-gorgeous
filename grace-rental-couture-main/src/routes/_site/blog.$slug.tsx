import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { BlogPostDetailPage } from "@/components/BlogPostDetailPage";


export const Route = createFileRoute("/_site/blog/$slug")({
  component: BlogPostDetailPage,
});


