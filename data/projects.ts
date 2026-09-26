export type Project = {
  slug: string;
  name: string;
  kind: string;
  status: string;
  summary: string;
  role: string;
  stack: string[];
  source: string;
  demo?: string;
  image?: string;
  imageAlt?: string;
  problem: string;
  approach: string[];
  decision: string;
  lesson: string;
  next: string;
};

export const projects: Project[] = [
  {
    slug: "pebblecode",
    name: "PebbleCode",
    kind: "Learning product",
    status: "Public prototype",
    summary: "Coding practice organized around the moment a learner gets stuck: run, inspect, get a hint, and try again.",
    role: "Product design and implementation; the public repository credits Addy.",
    stack: ["React", "TypeScript", "Vite", "Monaco Editor", "Node.js", "AWS integrations"],
    source: "https://github.com/addyvantage/PebbleCode",
    image: "/images/pebble-session.webp",
    imageAlt: "PebbleCode coding session with problem description, editor, test cases, and contextual mentor panel",
    demo: "https://main.d2c2alvh2q833h.amplifyapp.com/",
    problem: "A pass/fail result tells a learner what happened, but often leaves the next useful step unclear. PebbleCode treats failed runs as part of learning rather than a dead end.",
    approach: [
      "The session workspace places code, runtime feedback, and Pebble Coach in one flow, so help can refer to the attempt and its latest result.",
      "The coach offers hint, explanation, and next-step modes. The product also has a problem browser and an insights surface for practice history.",
      "The repository contains local API routes and optional AWS-backed paths. Its README distinguishes local execution from configured cloud integrations; a public frontend alone does not prove that every backend path is available to visitors."
    ],
    decision: "I chose to keep the attempt visible while asking for help. Giving away a complete answer too early would make the product faster at finishing tasks and worse at helping someone learn.",
    lesson: "The useful product unit is the recovery loop, not an isolated AI response. The live interface demonstrates that loop; learning impact has not been measured publicly.",
    next: "Document which execution and coach paths are enabled in the public demo, then test whether layered hints help learners make the next edit themselves."
  },
  {
    slug: "tuku",
    name: "Tuku",
    kind: "Developer tool",
    status: "Local-first project",
    summary: "A CLI and daemon that keep task state, checkpoints, handoffs, and evidence together across coding-agent work.",
    role: "Product and implementation in the public repository; external usage is not claimed.",
    stack: ["Go", "SQLite", "Unix socket IPC", "CLI"],
    source: "https://github.com/addyvantage/tuku",
    problem: "Long coding-agent tasks can lose intent and context across runs or handoffs. A worker's final message alone is a poor record of what happened or what still needs attention.",
    approach: [
      "A local daemon stores tasks, intents, briefs, checkpoints, runs, and proof state in SQLite. A CLI exposes start, message, run, checkpoint, continue, status, and inspect commands.",
      "Worker adapters execute bounded work. Tuku owns the operator-facing task state and treats transcripts and worker claims as evidence to review, not as automatic closure.",
      "Handoff and incident paths record follow-through, recovery actions, and unresolved risk. The README explicitly limits this version to a local runtime without a broad web UI or cloud dependency."
    ],
    decision: "I kept advisory risk signals separate from hard policy. A tool that quietly turns uncertain evidence into authority would make the operator less informed, not more.",
    lesson: "Continuity becomes easier to reason about when task state has a durable owner and handoffs have explicit receipts. This is a design and implementation claim, not a claim of measured team productivity.",
    next: "Exercise the CLI with more real tasks and publish a short end-to-end recording of a checkpoint and recovery."
  },
  {
    slug: "epistemic-audit-engine",
    name: "Epistemic Audit Engine",
    kind: "AI reliability experiment",
    status: "Research prototype",
    summary: "A claim-level audit service that separates supported, refuted, and unresolved statements in generated text.",
    role: "Implementation documented in the public repository; no production adoption claimed.",
    stack: ["Python", "FastAPI", "Next.js", "Evidence retrieval", "JSONL evaluation logs"],
    source: "https://github.com/addyvantage/Epistemic-Audit-Engine",
    image: "/images/epistemic-audit-ui.webp",
    imageAlt: "Epistemic Audit Engine interface with a text input for starting a claim audit",
    problem: "A single confidence score hides which statements in a long answer are grounded, contradicted, or still unknown.",
    approach: [
      "The FastAPI audit path extracts claims, links entities, retrieves evidence, verifies individual claims, and aggregates a structured risk response.",
      "The Next.js inspection interface lets a person review the per-claim output. The repository also contains health endpoints, append-only audit logs, and an evaluation harness.",
      "Evidence retrieval and verdicts are fallible. An uncertain result is surfaced as uncertainty rather than silently promoted to support."
    ],
    decision: "The risk aggregator guards against a misleading low-risk result on a small sample: refuted claims remain high risk, while unresolved small samples stay at least moderate in the implementation.",
    lesson: "A verdict is useful only with the claim and evidence that produced it. The repository demonstrates the pipeline, but does not establish accuracy in a live customer setting.",
    next: "Publish a clearly defined evaluation set and error analysis before making reliability claims."
  }
];

export const experiments = [
  { name: "FairHire AI", status: "Local multi-service prototype", summary: "A resume-analysis workflow that queues long-running work outside the request path, with local monitoring services.", source: "https://github.com/addyvantage/fairhire-ai" },
  { name: "DealLens AI", status: "Repository experiment", summary: "An asynchronous document-analysis backend for exploring financial-deal screening workflows.", source: "https://github.com/addyvantage/DealLens-AI-MA-Screener" }
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
