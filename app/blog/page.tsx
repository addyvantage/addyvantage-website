import Link from "next/link";

import { HomeDock } from "@/components/AppBar";
import { PixelFrame } from "@/components/ui/pixel-frame";
import {
  blogTopics,
  getFeaturedPost,
  getNonFeaturedPosts,
  shortNotes,
} from "@/data/blog-posts";

const xUrl = "https://x.com/addyvantage";

export default function BlogPage() {
  const featuredPost = getFeaturedPost();
  const posts = getNonFeaturedPosts();

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-slate-900 dark:bg-neutral-950 dark:text-white">
      <HomeDock />

      <section className="mx-auto w-full max-w-5xl px-5 pb-6 pt-16 sm:px-6 sm:pt-20 md:px-8 md:pt-24 lg:px-10">
        <div className="max-w-2xl md:pl-28">
          <p className="text-[0.92rem] uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-500">
            notebook
          </p>
          <h1 className="mt-2 text-[2.2rem] font-medium tracking-tight text-black dark:text-white sm:text-[2.6rem] md:text-[3.2rem]">
            Writing
          </h1>
          <p className="mt-3 max-w-[34rem] text-[1.08rem] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[1.14rem] md:text-[1.24rem]">
            Notes on building, AI systems, experiments, and ideas I keep
            returning to.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-5 pt-4 sm:px-6 md:px-8 lg:px-10">
        <div className="md:pl-28">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-black/30 dark:bg-white/18" />
            <p className="text-[0.84rem] uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">
              Featured
            </p>
          </div>

          <Link
            className="pixel-panel group block max-w-3xl overflow-hidden bg-white/80 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-colors duration-200 dark:bg-black/70 dark:shadow-[0_0_40px_rgba(255,255,255,0.04)] sm:px-7 sm:py-7 md:px-8 md:py-8"
            href={`/blog/${featuredPost.slug}`}
          >
            <PixelFrame variant="panel" />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.98rem] uppercase tracking-[0.18em] text-neutral-700 dark:text-neutral-300">
              <span>{featuredPost.date}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              <span>{featuredPost.readTime}</span>
            </div>
            <h2 className="mt-4 max-w-[18ch] text-[1.7rem] font-semibold leading-tight text-black transition-colors group-hover:text-neutral-700 dark:text-white dark:group-hover:text-neutral-200 sm:max-w-[22ch] sm:text-[1.95rem] md:text-[2.35rem]">
              {featuredPost.title}
            </h2>
            <p className="mt-4 max-w-[44rem] text-[1.03rem] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[1.1rem] md:text-[1.18rem]">
              {featuredPost.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {featuredPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="pixel-capsule min-h-[34px] px-3 py-0 text-[0.88rem] uppercase tracking-[0.14em] text-slate-700 dark:text-white"
                >
                  <PixelFrame variant="capsule" />
                  <span className="pixel-capsule-label">{tag}</span>
                </span>
              ))}
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-5xl px-5 sm:px-6 md:mt-16 md:px-8 lg:px-10">
        <div className="md:pl-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-black/30 dark:bg-white/18" />
            <p className="text-[0.84rem] uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">
              Writing Index
            </p>
          </div>

          <div className="max-w-3xl divide-y divide-slate-900/8 dark:divide-white/8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                className="group block py-5 first:pt-0 last:pb-0"
                href={`/blog/${post.slug}`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-500">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                  <span>{post.readTime}</span>
                  {post.tags[0] ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                      <span>{post.tags[0]}</span>
                    </>
                  ) : null}
                </div>
                <h3 className="mt-2 text-[1.28rem] font-semibold tracking-tight text-black transition-colors group-hover:text-neutral-700 dark:text-white dark:group-hover:text-neutral-200 sm:text-[1.4rem] md:text-[1.55rem]">
                  {post.title}
                </h3>
                <p className="mt-2 max-w-[44rem] text-[1rem] leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-[1.05rem]">
                  {post.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-5xl px-5 sm:px-6 md:mt-16 md:px-8 lg:px-10">
        <div className="md:pl-28">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-black/30 dark:bg-white/18" />
            <p className="text-[0.84rem] uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">
              Topics
            </p>
          </div>
          <div className="flex max-w-3xl flex-wrap gap-2">
            {blogTopics.map((topic) => (
              <span
                key={topic}
                className="pixel-capsule min-h-[40px] px-3.5 py-0 text-[0.96rem] uppercase tracking-[0.15em] text-slate-700 dark:text-white"
              >
                <PixelFrame variant="capsule" />
                <span className="pixel-capsule-label">{topic}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 w-full max-w-5xl px-5 sm:px-6 md:mt-16 md:px-8 lg:px-10">
        <div className="md:pl-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-black/30 dark:bg-white/18" />
            <p className="text-[0.84rem] uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-500">
              Notes
            </p>
          </div>
          <div className="grid max-w-3xl gap-4 md:grid-cols-3">
            {shortNotes.map((note) => (
              <div
                key={note.title}
                className="pixel-panel bg-slate-900/[0.03] px-5 py-5 dark:bg-white/[0.03]"
              >
                <PixelFrame variant="panel" />
                <p className="text-[1.22rem] leading-relaxed text-black dark:text-white md:text-[1.3rem]">
                  {note.title}
                </p>
                <p className="mt-3 text-[1.1rem] leading-relaxed text-neutral-600 dark:text-neutral-400 md:text-[1.16rem]">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-label="Blog closing CTA"
        className="mx-auto mt-16 w-full max-w-5xl px-5 pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:px-6 md:mt-20 md:px-8 lg:px-10"
      >
        <div className="flex flex-col items-center justify-center gap-4 text-center md:pl-0">
          <span className="h-1 w-14 rounded-full bg-black/75 dark:bg-white/80" />
          <p className="text-[1.28rem] leading-tight text-neutral-700 dark:text-neutral-300 sm:text-[1.4rem] md:text-[1.58rem]">
            Want to discuss any of these ideas? Say hi on{" "}
            <Link
              className="text-black underline decoration-black/35 underline-offset-[0.22em] transition-colors hover:text-neutral-600 dark:text-white dark:decoration-white/35 dark:hover:text-neutral-200"
              href={xUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              X
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
