import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Arrow } from "@/components/arrow";
import { AppleStyleDock } from "@/components/ui/demo";
import { blogPosts, getPostBySlug } from "@/data/blog-posts";
import { getProject } from "@/data/projects";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary, alternates: { canonical: `/blog/${slug}` }, openGraph: { type: "article", title: post.title, description: post.summary, url: `/blog/${slug}`, images: ["/opengraph-image"] } };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const project = post.projectSlug ? getProject(post.projectSlug) : undefined;

  return (
    <main id="main-content" className="portfolio-page">
      <div className="page-shell">
        <header className="eyebrow-row label"><Link className="inline-flex items-center gap-2" href="/blog"><Arrow dir="left" /> Writing</Link><span>{post.date} · {post.readTime}</span></header>
        <article>
          <div className="page-intro">
            <p className="eyebrow">{post.tags.join(" · ")}</p>
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
          </div>
          <div className="prose">
            {post.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="case-end">
            {project ? <Link className="text-link" href={`/work/${project.slug}`}>{project.name}: case study and source <Arrow /></Link> : <Link className="text-link" href="/blog"><Arrow dir="left" /> All notes</Link>}
            <a className="text-link" href="mailto:build@addyvantage.me">Reply by email <Arrow dir="up-right" /></a>
          </div>
        </article>
      </div>
      <AppleStyleDock />
    </main>
  );
}
