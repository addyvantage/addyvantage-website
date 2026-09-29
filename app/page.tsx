import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { Arrow } from "@/components/arrow";
import { ExperienceTabs } from "@/components/experience-tabs";
import { Portrait } from "@/components/portrait";
import { ProjectMedia } from "@/components/project-media";
import { AppleStyleDock } from "@/components/ui/demo";
import { blogPosts, shortNotes } from "@/data/blog-posts";
import { CAL_URL } from "@/data/contact";
import { education } from "@/data/experience";
import { experiments, firstSentence, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: { absolute: "Aditya Singh (Addy), software builder" },
  alternates: { canonical: "/" },
  openGraph: { title: "Aditya Singh (Addy), software builder", description: "Operational systems, AI products, and developer tools, designed around what happens after the first attempt.", url: "/" },
};

const [featured, ...builds] = projects;
const buildNotes = blogPosts.filter((post) => post.date === "Undated build note");

export default function HomePage() {
  return (
    <main id="main-content" className="portfolio-page">
      <div className="page-shell">
        <header className="eyebrow-row label"><span>Addy / Aditya Singh</span><span>Based in India</span></header>

        <section aria-labelledby="home-title" className="home-hero">
          <div>
            <p className="hero-name"><strong>Aditya “Addy” Singh</strong><span className="label">Software builder</span></p>
            <h1 id="home-title"><span>I build software for</span> <span>the moments <em>after</em></span> <span>the first answer.</span></h1>
            <p className="lead">Operational systems, AI products, and developer tools, designed for what happens after the first attempt: the failed run, the handoff, the claim that still needs checking.</p>
            <div className="action-row">
              <Link className="button-primary" href="/work">See the work <Arrow /></Link>
              <a className="text-link" href="mailto:build@addyvantage.me">build@addyvantage.me</a>
            </div>
          </div>
          <aside aria-label="Currently" className="hero-aside">
            <Portrait />
            <dl className="status-list">
              <dt className="label">Now</dt>
              <dd><strong>Apprentice, Credit and Fraud Risk</strong> at American Express.</dd>
              <dt className="label">Also</dt>
              <dd>Freelance product engineering through AxedStack, and independent builds of my own.</dd>
            </dl>
          </aside>
        </section>

        <section className="home-section" aria-labelledby="selected-title">
          <div className="section-index">01 / Selected work</div>
          <div>
            <div className="section-heading"><h2 id="selected-title">One large delivery, and three builds of my own.</h2></div>
            <div className="proof-list">
              <article className="proof proof-featured">
                <div>
                  <div className="label">01 · {featured.kind} · {featured.credit}</div>
                  <h3><Link href={`/work/${featured.slug}`}>{featured.name}</Link></h3>
                  <p className="proof-summary">{featured.summary}</p>
                  <ul className="scope-list">
                    {featured.scope?.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                  <p className="proof-decision"><span className="label">My part</span>{featured.contribution}</p>
                  <div className="link-row">
                    <Link className="text-link" href={`/work/${featured.slug}`}>Read the case study <Arrow /></Link>
                  </div>
                </div>
                <ProjectMedia project={featured} sizes="(max-width: 900px) 90vw, 448px" />
              </article>
              <div className="label proof-group">Independent builds</div>
              {builds.map((project, index) => (
                <article className="proof" key={project.slug}>
                  <div>
                    <div className="label">0{index + 2} · {project.kind} · {project.credit}</div>
                    <h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3>
                    <p className="proof-summary">{project.summary}</p>
                    <p className="proof-decision"><span className="label">Decision</span>{firstSentence(project.decision)}</p>
                    <div className="link-row">
                      <Link className="text-link" href={`/work/${project.slug}`}>Case study <Arrow /></Link>
                      {project.source && <a className="text-link" href={project.source} rel="noopener noreferrer" target="_blank">Source <Arrow dir="up-right" /></a>}
                      {project.demo && <a className="text-link" href={project.demo} rel="noopener noreferrer" target="_blank">{project.demoLabel} <Arrow dir="up-right" /></a>}
                    </div>
                  </div>
                  <ProjectMedia project={project} sizes="(max-width: 900px) 90vw, 384px" />
                </article>
              ))}
            </div>
            <div className="minor-work">
              {experiments.map((item) => (
                <div key={item.name}>
                  <span className="label">Smaller experiment · {item.status}</span>
                  <h4>{item.name}</h4>
                  <p>{item.summary}</p>
                  <a className="text-link" href={item.source} rel="noopener noreferrer" target="_blank">Source <Arrow dir="up-right" /></a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="experience-title">
          <div className="section-index">02 / Experience</div>
          <div>
            <h2 id="experience-title">Where I’m learning and working.</h2>
            <ExperienceTabs />
            <dl className="education">
              {education.map((item) => (
                <Fragment key={item.org}>
                  <dt className="label">{item.period}</dt>
                  <dd><strong>{item.org}</strong> · {item.detail}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </section>

        <section className="home-section" aria-labelledby="about-title" id="about">
          <div className="section-index">03 / About</div>
          <div>
            <h2 id="about-title">Curiosity with a useful outcome.</h2>
            <p>I’ve always liked that a small group can build something on the internet and put it in people’s hands. I usually start with the awkward part of a workflow: unclear intent, a failed run, or an answer that needs checking. Then I build a way forward that a person can understand and use.</p>
            <p>Outside the apprenticeship, I keep making small products and studying what makes them dependable. There’s a more personal side <Link className="text-link" href="/some-fun-things-about-me">over here</Link>, including an old flute photograph.</p>
            <ol className="principles">
              {shortNotes.map((note, i) => (
                <li key={note.title}>
                  <span className="label">Habit 0{i + 1}</span>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="home-section" aria-labelledby="writing-title">
          <div className="section-index">04 / Notebook</div>
          <div>
            <div className="section-heading"><h2 id="writing-title">Notes from the build.</h2><Link className="text-link" href="/blog">All notes <Arrow /></Link></div>
            <ul className="note-list">
              {buildNotes.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>
                    <span className="label">Build note · {post.tags[0]}</span>
                    <span className="note-title">{post.title}</span>
                    <span className="note-summary">{post.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="home-section" aria-labelledby="contact-title" id="contact">
          <div className="section-index">05 / Contact</div>
          <div>
            <h2 id="contact-title">Have a useful problem in mind?</h2>
            <p>I’m interested in product engineering, AI systems, developer tools, and collaborators who care about how software behaves when things go wrong.</p>
            <div className="contact-options">
              <div>
                <span className="label">Write</span>
                <a className="contact-email" href="mailto:build@addyvantage.me">build@addyvantage.me</a>
                <p>Best for a brief, links, or anything that needs detail. Tell me what you’re building and where it gets stuck.</p>
              </div>
              <div>
                <span className="label">Talk</span>
                <a className="contact-call" href={CAL_URL} rel="noopener noreferrer" target="_blank">Book a 30-minute conversation <Arrow dir="up-right" /></a>
                <p>A video call on Cal.com, weekdays between 9 AM and 5 PM India time. You’ll be asked for a line of context so the time is useful.</p>
              </div>
            </div>
            <div className="link-row">
              <a className="text-link" href="https://github.com/addyvantage" rel="noopener noreferrer" target="_blank">GitHub <Arrow dir="up-right" /></a>
              <a className="text-link" href="https://www.linkedin.com/in/addyvantage/" rel="noopener noreferrer" target="_blank">LinkedIn <Arrow dir="up-right" /></a>
              <a className="text-link" href="https://x.com/addyvantage" rel="noopener noreferrer" target="_blank">X <Arrow dir="up-right" /></a>
            </div>
          </div>
        </section>
      </div>
      <AppleStyleDock />
    </main>
  );
}
