/** Longer case studies are written as ordered sections instead of the four standard ones. */
export type CaseSection = {
  label: string;
  heading: string;
  body?: string[];
  points?: { title: string; text: string }[];
  flows?: { title: string; roles: string; steps: string[] }[];
};

export type Project = {
  slug: string;
  name: string;
  kind: string;
  status: string;
  period: string;
  summary: string;
  role: string;
  stack: string[];
  /** Public source code, when it exists. Client work has none. */
  source?: string;
  demo?: string;
  demoLabel?: string;
  /** Short credit shown in compact listings. */
  credit: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  /** A second, more detailed image for the case study. */
  detailImage?: { src: string; alt: string; caption: string; width: number; height: number };
  /** Verbatim excerpt from public docs, shown when there is no screenshot. */
  excerpt?: string;
  problem: string;
  approach: string[];
  decision: string;
  lesson: string;
  next: string;
  /** Verified scale indicators, shown on the case study. */
  stats?: { value: string; label: string }[];
  sections?: CaseSection[];
  /** Short scope lines for a featured card. */
  scope?: string[];
  /** One line on the author's own part, for a featured card. */
  contribution?: string;
  /** Render the product map instead of a capture. */
  map?: boolean;
};

export const projects: Project[] = [
  {
    slug: "hotel-pms",
    name: "Hotel PMS",
    kind: "Property management system",
    status: "Pre-launch, running on demo data",
    period: "Jul to Sep 2026",
    summary: "A hotel management system for several properties: a back office, a front-desk board, a staff mobile app, and a public booking site, all on one API and one database.",
    role: "Freelance engineer through AxedStack, with Avi Mehta and Shrey Singh. I built the payment, channel, and messaging integrations, accounting posting, tenant-isolation fixes, operator screens, and backups, and merged most of the team’s pull requests.",
    credit: "Freelance via AxedStack · team of three",
    stack: ["Laravel", "PostgreSQL", "Filament", "Next.js", "Expo / React Native", "Redis", "Docker"],
    map: true,
    scope: [
      "Reservations, check-in, and checkout, with double booking blocked by the database",
      "Billing, night audit, gapless invoices, and an append-only ledger",
      "Housekeeping, point of sale, inventory, and reports for several properties",
      "Channel manager, hosted payments, WhatsApp, and accounting export",
    ],
    contribution: "Integrations (channel manager, payments, WhatsApp), accounting posting, tenant-isolation fixes, operator screens, and backups.",
    imageCaption: "Product map drawn from the codebase. Client screens are not shown.",
    problem: "A hotel runs on work that happens in different places at different times: a booking arrives online, the front desk assigns a room, housekeeping turns it over, the night audit posts charges, and accounting needs a clean ledger in the morning. When those tasks live in separate tools, a room can be sold twice or a stay can close with unposted nights.",
    approach: [],
    decision: "We made the database enforce the rules that could not break: no double booking, append-only money, and isolation between hotel groups.",
    lesson: "The invariants that mattered most held because PostgreSQL enforced them. It has not launched with a hotel yet; this describes design and tests, not operating results.",
    next: "Start external dependencies in week one: payment gateway checks, channel certification, and messaging accounts sat outside the codebase and set the launch date.",
    stats: [
      { value: "28", label: "backend modules" },
      { value: "82", label: "database tables" },
      { value: "157", label: "API operations in the OpenAPI contract" },
      { value: "5 / 30", label: "staff roles / permissions" },
      { value: "4", label: "surfaces: back office, platform panel, booking site, mobile" },
      { value: "~1,770", label: "backend test cases, plus 6 end-to-end specs" },
    ],
    sections: [
      {
        label: "01 / Problem",
        heading: "What had to work together",
        body: [
          "A hotel runs on work that happens in different places at different times. A booking arrives online or from a travel site, the front desk assigns a room and checks the guest in, housekeeping turns the room over, the night audit posts the day’s charges, and accounting needs a ledger that balances the next morning.",
          "Each of those steps depends on the one before it. If they live in separate tools, a room can be sold twice, a guest can check out with nights still unbilled, or an invoice number can be skipped. The brief was one system in which those steps share the same records and rules, for several properties under one account.",
        ],
      },
      {
        label: "02 / System",
        heading: "Four surfaces, one API",
        body: [
          "The back office is where managers configure properties, rooms, rates, taxes, staff, and roles, and where billing, night audit, reports, point of sale, and inventory live. Front-desk staff work from a board inside it that lists arrivals, in-house guests, and departures, with a check-in or check-out action on each row.",
          "Housekeeping and front-desk staff also have a mobile app, built to keep working offline and sync when the connection returns. Guests book on a public booking site and pay through a hosted payment page. A separate platform panel lets the operator onboard hotel groups and manage their plans.",
          "Every surface calls the same domain services and the same permission checks, so a check-in from the board, the app, or the API follows one set of rules.",
        ],
      },
      {
        label: "03 / Workflows",
        heading: "Three paths through the product",
        flows: [
          {
            title: "A stay, from booking to invoice",
            roles: "Front desk, manager",
            steps: [
              "Front desk searches availability and creates the reservation. The room is assigned inside a transaction, and an overlapping booking is rejected by the database.",
              "Checking the guest in opens their bill (a folio) automatically.",
              "Each night, a manager runs the night audit. It posts one room charge per night at the rate frozen when the booking was made, then advances the property’s business date. Front-desk users cannot run it.",
              "At checkout the system refuses to close the stay until every contracted night is posted, and it creates the departure-cleaning task for housekeeping in the same transaction.",
              "Settling the bill requires a zero balance and assigns the next invoice number with no gaps.",
            ],
          },
          {
            title: "A direct booking with online payment",
            roles: "Guest, payment provider",
            steps: [
              "A guest picks dates on the public booking site. The system places a 30-minute hold that already blocks the room.",
              "The guest is sent to a hosted payment page; the attempt carries an idempotency key.",
              "The provider’s webhook is verified against its signature before anything changes. A valid payment is recorded once and confirms the reservation; an unconfigured or invalid webhook is refused.",
              "Unpaid holds expire on a five-minute schedule and release the room.",
            ],
          },
          {
            title: "A booking from a travel site",
            roles: "Channel manager",
            steps: [
              "Bookings from online travel agencies arrive through a channel manager (Channex) as numbered revisions.",
              "Each revision is applied once and in one transaction, creating, changing, or cancelling the local reservation. A replayed revision does nothing.",
              "Availability and rates are pushed back hourly and reconciled every 30 minutes.",
            ],
          },
        ],
      },
      {
        label: "04 / My part",
        heading: "What I built, and what others built",
        body: [
          "I worked on it as a freelancer through AxedStack, alongside Avi Mehta and Shrey Singh. Avi set up the repository, its architecture and conventions, the first billing and night-audit core, and much of the mobile app. Shrey built the booking engine, the in-stay guest services, and the front-desk board, and worked with me on the public booking site.",
        ],
        points: [
          { title: "Integrations", text: "The Channex channel-manager flow end to end, Razorpay and Stripe hosted payments with signed webhooks, and WhatsApp notifications." },
          { title: "Money and accounting", text: "Night-audit journal snapshots that post to external accounting exactly once, and the row lock that stops two settlements from using the same invoice number." },
          { title: "Tenant isolation", text: "Moved the application off a database role that silently bypassed row-level security, and fixed how the tenant is resolved for each request under the long-running server." },
          { title: "Operator screens", text: "Early back-office screens for billing, night audit, the availability calendar, the housekeeping board, the room grid, staff and roles, and the audit log, plus a later redesign across the booking site and both panels." },
          { title: "Access and staff", text: "Property-level permissions within a hotel group, and staff account setup and offboarding." },
          { title: "Operations", text: "Database backups with off-site copies and restore drills, the production environment notes, and the offline runtime for the mobile app." },
          { title: "Product documents", text: "The specification, the reconciliation against the statement of work, and the delivery tracker the team worked from." },
        ],
      },
      {
        label: "05 / Decisions",
        heading: "Rules the database enforces",
        points: [
          { title: "No double booking", text: "A PostgreSQL exclusion constraint on tenant, room, and stay dates rejects overlapping reservations, even if two requests arrive at once. The API turns that into a clear conflict response." },
          { title: "Tenants cannot see each other", text: "Row-level security is forced on tenant tables, and the application connects as a role that cannot bypass it." },
          { title: "Money only moves forward", text: "Amounts are stored as integers in the smallest currency unit. Ledger entries and audit records cannot be updated or deleted by the application; mistakes are corrected with reversing entries, and every posting must balance." },
          { title: "Invoice numbers without gaps", text: "Numbers come from a locked counter row rather than a sequence, so a failed settlement cannot burn a number." },
          { title: "One business date per property", text: "The night audit is idempotent for each night and refuses to close a day that has not ended in the property’s own time zone." },
          { title: "Integrations fail closed", text: "Payment, channel, messaging, and accounting integrations sit behind adapters that refuse or do nothing when they are not configured, instead of guessing." },
        ],
      },
      {
        label: "06 / Status",
        heading: "Where it stands",
        body: [
          "The system runs in a production-style environment with demonstration properties and data. It has not launched with a hotel or real guests, and I don’t claim operating results. The remaining steps before launch were mostly outside the code: payment-provider checks, channel certification, messaging accounts, and acceptance testing with the client.",
        ],
      },
      {
        label: "07 / Learning",
        heading: "What I would keep, and change",
        body: [
          "Keep the invariants in the database. The rules that mattered most held because PostgreSQL enforced them, not because every code path remembered to check.",
          "Test the security boundary with the real connection. Row-level security looked correct in every policy while the app was connecting as a role that ignored all of them; only a test that ran as the real application role proved isolation.",
          "Start the outside work on day one. Gateway checks, channel certification, and messaging accounts took longer than the features that depended on them.",
        ],
      },
    ],
  },
  {
    slug: "pebblecode",
    name: "PebbleCode",
    kind: "Learning product",
    status: "Public prototype",
    period: "2026",
    summary: "Coding practice organized around the moment a learner gets stuck: run, inspect, get a hint, and try again.",
    role: "Designed and built it; sole contributor to the public repository.",
    stack: ["React", "TypeScript", "Vite", "Monaco Editor", "Node.js", "AWS integrations"],
    source: "https://github.com/addyvantage/PebbleCode",
    credit: "Solo build",
    image: "/images/pebblecode-home.webp",
    imageAlt: "PebbleCode product preview: a Two Sum attempt fails test case 2, the failing line is highlighted, and Pebble coach suggests checking the complement before storing the value",
    imageCaption: "Animated product preview on the PebbleCode homepage",
    detailImage: { src: "/images/pebblecode-session.webp", alt: "PebbleCode session workspace with the problem statement, a Python editor, test cases, and the Pebble coach panel with hint, explain, and next-step modes", caption: "Session workspace on the live prototype: problem, editor, test cases, and coach in one view", width: 1920, height: 1200 },
    demo: "https://main.d2c2alvh2q833h.amplifyapp.com/",
    demoLabel: "Live prototype",
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
    period: "2026",
    summary: "A CLI and daemon that keep task state, checkpoints, handoffs, and evidence together across coding-agent work.",
    role: "Designed and built it in Go; sole contributor to the public repository. External usage is not claimed.",
    stack: ["Go", "SQLite", "Unix socket IPC", "CLI"],
    source: "https://github.com/addyvantage/tuku",
    credit: "Solo build",
    excerpt: `$ tuku start --goal "Implement bounded feature" --repo .
$ tuku checkpoint --task <TASK_ID> --human
$ tuku continue --task <TASK_ID> --human
$ tuku inspect --task <TASK_ID> --human`,
    imageCaption: "Command flow from the public README",
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
    period: "2026",
    summary: "A claim-level audit service that separates supported, refuted, and unresolved statements in generated text.",
    role: "Designed and built the pipeline and interface; sole contributor to the public repository. No production adoption is claimed.",
    stack: ["Python", "FastAPI", "Next.js", "Evidence retrieval", "JSONL evaluation logs"],
    source: "https://github.com/addyvantage/Epistemic-Audit-Engine",
    credit: "Solo build",
    image: "/images/eae-home.webp",
    imageAlt: "Epistemic Audit Engine homepage: Audit where AI confidence exceeds evidence, with Run Epistemic Audit and Read Methodology buttons",
    imageCaption: "Homepage of the deployed interface",
    detailImage: { src: "/images/eae-audit-result.webp", alt: "Epistemic Audit Engine result for three sentences: six extracted claims, three supported by Wikidata, three left uncertain, none refuted, with the inspector showing the Wikidata evidence for 'The Eiffel Tower is in Paris'", caption: "A real audit, run locally from the current source on 29 Sep 2026. The false claim about Marie Curie is left uncertain rather than refuted.", width: 1920, height: 1080 },
    demo: "https://epistemic-audit-engine.vercel.app",
    demoLabel: "Live interface",
    problem: "A single confidence score hides which statements in a long answer are grounded, contradicted, or still unknown.",
    approach: [
      "The FastAPI audit path extracts claims, links entities, retrieves evidence, verifies individual claims, and aggregates a structured risk response.",
      "The Next.js inspection interface lets a person review the per-claim output. The repository also contains health endpoints, append-only audit logs, and an evaluation harness.",
      "Evidence retrieval and verdicts are fallible. An uncertain result is surfaced as uncertainty rather than silently promoted to support."
    ],
    decision: "The risk aggregator guards against a misleading low-risk result on a small sample: refuted claims remain high risk, while unresolved small samples stay at least moderate in the implementation.",
    lesson: "A verdict is useful only with the claim and evidence that produced it. The repository demonstrates the pipeline, but does not establish accuracy in a live customer setting.",
    next: "Redeploy the backend with a Wikipedia client that identifies itself properly (the deployed one was being rate-limited, which left every claim uncertain), keep it warm, then publish a defined evaluation set and error analysis before making reliability claims."
  }
];

export const experiments = [
  { name: "FairHire AI", status: "Local multi-service prototype", summary: "A resume-analysis workflow that queues long-running work outside the request path, with local monitoring services.", source: "https://github.com/addyvantage/fairhire-ai" },
  { name: "DealLens AI", status: "Repository experiment", summary: "An asynchronous document-analysis backend for exploring financial-deal screening workflows.", source: "https://github.com/addyvantage/DealLens-AI-MA-Screener" }
];

/** First sentence of a longer field, for compact summaries. */
export function firstSentence(text: string) { return text.split(/(?<=\.)\s/)[0]; }

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
