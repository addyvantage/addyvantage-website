import { HomeDock } from "@/components/AppBar";
import { WorkTimeline } from "@/components/work/WorkTimeline";

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-slate-900 dark:bg-neutral-950 dark:text-white">
      <HomeDock />
      <WorkTimeline />
    </main>
  );
}
