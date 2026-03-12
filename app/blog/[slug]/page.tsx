import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeDock } from "@/components/AppBar";
import { blogPosts, getPostBySlug } from "@/data/blog-posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-slate-900 dark:bg-neutral-950 dark:text-white">
      <HomeDock />

      <article className="mx-auto w-full max-w-4xl px-5 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-16 sm:px-6 sm:pt-20 md:px-8 md:pt-24 lg:px-10">
        <div className="max-w-2xl md:pl-28">
          <Link
            className="text-[0.84rem] uppercase tracking-[0.22em] text-neutral-500 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
            href="/blog"
          >
            Back to writing
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.84rem] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-500">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-4 text-[2.1rem] font-semibold leading-tight tracking-tight text-black dark:text-white sm:text-[2.5rem] md:text-[3rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-[1.06rem] leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-[1.18rem]">
            {post.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-slate-900/10 bg-slate-900/4 px-2.5 py-1 text-[0.75rem] uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-2xl space-y-5 text-[1.05rem] leading-[1.75] text-neutral-700 dark:text-neutral-300 md:mt-14 md:pl-28 md:text-[1.14rem]">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
