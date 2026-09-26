import type { Metadata } from "next";
import Link from "next/link";
import { AppleStyleDock } from "@/components/ui/demo";
import { WorkTimeline } from "@/components/work/WorkTimeline";
import { experiments } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Aditya Singh",
  description: "Selected software projects and professional experience from Aditya Singh: PebbleCode, Tuku, Epistemic Audit Engine, and more.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Work — Aditya Singh", description: "Projects, decisions, and public evidence from Addy's software work.", url: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main-content" className="portfolio-page">
      <div className="page-shell">
        <header className="eyebrow-row"><Link href="/home">← ADDY / HOME</Link><span>WORK / INDEX</span></header>
        <section className="page-intro work-intro">
          <p className="eyebrow">SELECTED WORK</p>
          <h1>Things I’ve built, and what I learned making them.</h1>
          <p>Scroll through projects and experience one at a time. Hover a card for the details, or open it by keyboard or touch.</p>
          <a className="text-link" href="#after-timeline">Skip to smaller experiments</a>
        </section>
      </div>
      <section className="timeline-section" aria-labelledby="timeline-heading">
        <div className="page-shell timeline-section-heading"><span className="section-index">01 / THE JOURNEY</span><h2 id="timeline-heading">Work, one piece at a time.</h2><p>Projects and roles, with more detail when you open each card.</p></div>
        <WorkTimeline />
      </section>
      <div className="page-shell">
        <section id="after-timeline" className="index-section" aria-labelledby="experiments-heading">
          <div className="section-index">02 / MORE EXPERIMENTS</div>
          <div><h2 id="experiments-heading">Smaller investigations</h2><div className="experiment-list">{experiments.map(item => <article key={item.name}><div className="project-label">{item.status}</div><h3>{item.name}</h3><p>{item.summary}</p><a className="text-link" href={item.source} target="_blank" rel="noopener noreferrer">Inspect repository ↗</a></article>)}</div></div>
        </section>
        <footer className="contact-footer"><h2>Want to talk through a build?</h2><p>Send me a note about the problem, the people it serves, and what you want to make.</p><a className="button-primary" href="mailto:adityasingh0929@gmail.com">Email Addy ↗</a></footer>
      </div>
      <AppleStyleDock />
    </main>
  );
}
