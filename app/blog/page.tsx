import Link from "next/link";
import type { Metadata } from "next";

import { Arrow } from "@/components/arrow";
import { AppleStyleDock } from "@/components/ui/demo";
import { PixelFrame } from "@/components/ui/pixel-frame";
import { blogPosts, getFeaturedPost } from "@/data/blog-posts";

export const metadata: Metadata = { title: "Writing", description: "Build notes on PebbleCode, Tuku, and claim-level AI verification from Aditya Singh.", alternates: {canonical: "/blog"}, openGraph: {title: "Writing · Aditya Singh", description: "Specific notes from software projects and experiments.", url: "/blog", images: ["/opengraph-image"]} };

export default function BlogPage() {
  const featured = getFeaturedPost();
  const buildNotes = blogPosts.filter((post) => post.date === "Undated build note" && post !== featured);
  const shortNotes = blogPosts.filter((post) => post.date !== "Undated build note");

  return (
    <main id="main-content" className="portfolio-page">
      <div className="page-shell">
        <header className="eyebrow-row label"><Link href="/">Addy / Aditya Singh</Link><span>Notebook</span></header>
        <section className="page-intro">
          <p className="eyebrow">Notebook</p>
          <h1>Writing</h1>
          <p>Build notes from my own projects: what I tried, the tradeoff I made, and what I would test next. They are working notes, so most are short and none are dated.</p>
        </section>

        <section className="home-section" aria-labelledby="build-notes">
          <div className="section-index" id="build-notes">Build notes</div>
          <div>
            <Link className="pixel-panel featured-note" href={`/blog/${featured.slug}`}>
              <PixelFrame variant="panel" />
              <span className="label">Start here · {featured.tags[0]} · {featured.readTime}</span>
              <h2>{featured.title}</h2>
              <p>{featured.summary}</p>
            </Link>
            <ul className="note-list">
              {buildNotes.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="label">{post.tags[0]} · {post.readTime}</span>
                    <span className="note-title">{post.title}</span>
                    <span className="note-summary">{post.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-section" aria-labelledby="short-notes">
          <div className="section-index" id="short-notes">Short notes</div>
          <div>
            <p>Smaller thoughts and one concept that isn’t built yet.</p>
            <ul className="note-list compact">
              {shortNotes.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="label">{post.date.replace("Undated ", "")} · {post.tags[0]}</span>
                    <span className="note-title">{post.title}</span>
                    <span className="note-summary">{post.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-section" aria-labelledby="blog-contact">
          <div className="section-index">Reply</div>
          <div>
            <h2 id="blog-contact">Disagree with a note?</h2>
            <p>I’d like to hear it, especially if you have run into the same problem.</p>
            <a className="text-link" href="mailto:build@addyvantage.me">build@addyvantage.me <Arrow dir="up-right" /></a>
          </div>
        </section>
      </div>
      <AppleStyleDock />
    </main>
  );
}
