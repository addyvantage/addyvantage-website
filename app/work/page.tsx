import type { Metadata } from "next";
import { AppleStyleDock } from "@/components/ui/demo";
import { WorkTimeline } from "@/components/work/WorkTimeline";

export const metadata: Metadata = {
  title: "Work",
  description: "Work and experience from Aditya Singh: a multi-property hotel PMS, PebbleCode, Tuku, and Epistemic Audit Engine.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Work · Aditya Singh", description: "Projects and experience from Addy's software work.", url: "/work", images: ["/opengraph-image"] },
};

export default function WorkPage() {
  return (
    <main id="main-content" className="relative min-h-screen overflow-x-hidden bg-white text-slate-900 dark:bg-neutral-950 dark:text-white">
      <h1 className="sr-only">Work by Aditya Singh</h1>
      <AppleStyleDock />
      <WorkTimeline />
    </main>
  );
}
