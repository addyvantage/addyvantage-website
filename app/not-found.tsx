import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { AppleStyleDock } from "@/components/ui/demo";
export default function NotFound() { return <main id="main-content" className="portfolio-page"><div className="page-shell"><header className="eyebrow-row label"><Link className="inline-flex items-center gap-2" href="/"><Arrow dir="left" /> Addy / Home</Link><span>404</span></header><section className="page-intro"><p className="eyebrow">Lost a tab?</p><h1>This page isn’t here.</h1><p>Head back to the work index or start at the homepage.</p><div className="action-row"><Link className="button-primary" href="/">Go home <Arrow /></Link><Link className="button-secondary" href="/work">Browse work <Arrow /></Link></div></section></div><AppleStyleDock /></main>; }
