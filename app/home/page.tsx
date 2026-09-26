import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppleStyleDock } from "@/components/ui/demo";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Aditya Singh (Addy) — Software builder",
  description: "Aditya Singh builds AI systems, developer tools, and useful interfaces. Explore PebbleCode, Tuku, and his work on claim-level AI reliability.",
  alternates: { canonical: "/home" },
  openGraph: { title: "Aditya Singh (Addy) — Software builder", description: "AI systems, developer tools, and interfaces built with attention to the whole product loop.", url: "/home" },
};

export default function HomePage() {
  return (
    <main id="main-content" className="portfolio-page">
      <div className="page-shell">
        <header className="eyebrow-row"><span>ADDY / ADITYA SINGH</span><span>BASED IN INDIA · 2026</span></header>
        <section aria-labelledby="home-title" className="home-hero">
          <div>
            <p className="eyebrow">HELLO, I’M ADDY <span aria-hidden="true">✳</span></p>
            <h1 id="home-title">I build software for the moments <em>after</em> the first answer.</h1>
            <p className="hero-intro">I’m Aditya Singh, a software builder drawn to AI systems, developer tools, and useful interfaces. I think through the whole loop: the user’s problem, the architecture, what breaks, and how someone recovers.</p>
            <p className="current-line"><span className="status-mark" aria-hidden="true" /> Currently an apprentice at American Express, learning and contributing to data and product work.</p>
            <div className="action-row"><Link className="button-primary" href="/work">Explore selected work <span aria-hidden="true">↗</span></Link><a className="button-secondary" href="mailto:adityasingh0929@gmail.com">Contact me <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="hero-portrait"><Image src="/images/profile-light.webp" width={400} height={400} alt="Portrait of Aditya Singh" priority className="portrait-light" sizes="(max-width: 700px) 108px, 180px" /><Image src="/images/profile-dark.webp" width={400} height={400} alt="" aria-hidden="true" priority className="portrait-dark" sizes="(max-width: 700px) 108px, 180px" /><span className="portrait-caption">the person behind the tabs</span></div>
        </section>
        <section className="home-section" aria-labelledby="about-title"><div className="section-index">01 / ABOUT</div><div><h2 id="about-title">Curiosity with a useful outcome.</h2><p>I’ve always liked that a small group can build something on the internet and put it in people’s hands. I usually start with the awkward part of a workflow: unclear intent, a failed run, or an answer that needs checking. Then I build a way forward that a person can understand and use.</p><p>Outside the current apprenticeship, I keep making small products and studying what makes them dependable. There’s a more personal side <Link className="text-link" href="/some-fun-things-about-me">over here</Link>, including an old flute photograph.</p></div></section>
        <section className="home-section" aria-labelledby="selected-title"><div className="section-index">02 / SELECTED WORK</div><div><div className="section-heading"><h2 id="selected-title">A few things I’ve made.</h2><Link className="text-link" href="/work">All work ↗</Link></div><div className="project-list">{projects.map((project, index) => <article className="project-row" key={project.slug}><span className="project-number">0{index + 1}</span><div><div className="project-label">{project.kind} · {project.status}</div><h3><Link href={`/work/${project.slug}`}>{project.name} <span aria-hidden="true">↗</span></Link></h3><p>{project.summary}</p><div className="inline-links"><Link href={`/work/${project.slug}`}>Read the case study</Link><a href={project.source} target="_blank" rel="noopener noreferrer">Source ↗</a>{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Live prototype ↗</a>}</div></div></article>)}</div></div></section>
        <section className="home-section" aria-labelledby="experience-title"><div className="section-index">03 / EXPERIENCE</div><div><h2 id="experience-title">Where I’m learning and working.</h2><div className="experience-list"><div><span>SEP 2026 — PRESENT</span><p><strong>American Express</strong> · Apprentice, Credit and Fraud Risk</p><small>Learning and contributing to data, product, and workflow problems.</small></div><div><span>2025</span><p><strong>NUS Global Immersion Programme</strong> · Team analytics project</p><small>Worked with a five-person team on Airbnb data analysis and reporting.</small></div><div><span>DEC 2024 — JAN 2025</span><p><strong>Sukrit Technologies</strong> · Data Science Intern</p><small>Python and SQL data cleaning and reporting work.</small></div></div><p className="education-note">Education: B.Tech, Computer Science &amp; Systems Engineering, KIIT · Class of 2026. Modern School, Barakhamba Road · 2022.</p></div></section>
        <section className="home-section" aria-labelledby="writing-title"><div className="section-index">04 / NOTEBOOK</div><div><h2 id="writing-title">Notes from the build.</h2><p>Short, specific writing on coding recovery, agent continuity, and checking generated claims.</p><Link className="text-link" href="/blog">Read the notebook ↗</Link></div></section>
        <footer className="contact-footer"><span className="section-index">05 / SAY HELLO</span><h2>Have a useful problem in mind?</h2><p>I’m interested in product engineering, AI systems, developer tools, and collaborators who care about how software behaves when things go wrong.</p><div className="action-row"><a className="button-primary" href="mailto:adityasingh0929@gmail.com">Email Addy ↗</a><a className="button-secondary" href="https://www.linkedin.com/in/addyvantage/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></footer>
      </div>
      <AppleStyleDock />
    </main>
  );
}
