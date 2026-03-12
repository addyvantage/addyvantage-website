export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  notes?: string[];
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-a-recovery-first-coding-platform",
    title: "Designing a Recovery-First Coding Platform",
    summary:
      "How PebbleCode was shaped around the loop of run, diagnose, recover, and rerun.",
    date: "March 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["AI Systems", "Product Thinking", "Interfaces"],
    notes: [
      "feedback should lower the cost of trying again",
      "a good learning tool should notice confusion before the user quits",
    ],
    content: [
      "PebbleCode started with a simple observation: most coding tools are built around correctness, not recovery. They tell you whether something worked, but they do not do much to help you recover from the moment it breaks.",
      "I wanted to build around a different loop. Run. Diagnose. Recover. Rerun. That loop feels closer to how people actually learn, especially when they are still building confidence.",
      "Once that became the core product idea, the interface decisions got clearer. The AI mentor had to be contextual instead of generic. The IDE had to preserve state. The feedback system had to push the user one step forward instead of collapsing the whole problem into a single answer.",
      "The product direction matters because the system design follows from it. Recovery-first design is not only a UX idea. It affects orchestration, prompts, analytics, and the way progression is modeled over time.",
    ],
  },
  {
    slug: "why-llm-products-need-better-failure-loops",
    title: "Why LLM Products Need Better Failure Loops",
    summary:
      "Most AI products optimize for first-response quality and ignore what happens after the model is wrong.",
    date: "February 2026",
    readTime: "6 min read",
    tags: ["LLM Engineering", "Product Thinking"],
    content: [
      "A lot of AI products still treat failure like an edge case. In practice, failure is part of the product. The question is not whether the model will be wrong. The question is what the system does next.",
      "Good failure loops create structure after uncertainty. They give the user a way to inspect, retry, narrow, and recover instead of forcing them to restart from scratch.",
      "That matters even more when the product is used for thinking work. A bad answer with no recovery path breaks trust. A debuggable answer can still be useful.",
    ],
  },
  {
    slug: "building-pebblecode-on-aws",
    title: "Building PebbleCode on AWS",
    summary:
      "Notes on why the platform ended up serverless, where the architecture bends, and what I would simplify next.",
    date: "February 2026",
    readTime: "7 min read",
    tags: ["Architecture", "Startups", "AI Systems"],
    content: [
      "PebbleCode runs on a serverless AWS stack because it matched the shape of the product early on: bursty usage, small surfaces, and a need to move quickly.",
      "Cognito, API Gateway, Lambda, DynamoDB, and S3 let me build a full product loop without managing too much infrastructure overhead. That said, every convenience creates a different kind of complexity in observability and local debugging.",
      "The tradeoff was acceptable because the product needed speed of iteration more than infrastructure purity. If the system grows in a certain direction, I will probably replace pieces of it later.",
    ],
  },
  {
    slug: "making-model-context-protocol-understandable",
    title: "Making Model Context Protocol Understandable",
    summary:
      "What MCP Zero taught me about teaching a protocol through interfaces instead of documentation alone.",
    date: "January 2026",
    readTime: "5 min read",
    tags: ["Interfaces", "Experiments", "LLM Engineering"],
    content: [
      "Protocols are usually explained in abstractions, but people learn them through behavior. MCP Zero came from that mismatch.",
      "I wanted to make the protocol legible by turning concepts into flows. Instead of reading about clients, tools, and servers in isolation, users could see how the pieces talked to each other.",
      "The interesting part was not the visual layer itself. It was the realization that better interfaces can compress a lot of conceptual overhead.",
    ],
  },
  {
    slug: "building-an-epistemic-audit-engine",
    title: "Building an Epistemic Audit Engine",
    summary:
      "A notebook entry on claim extraction, verification middleware, and why confidence scores need structure behind them.",
    date: "December 2025",
    readTime: "7 min read",
    tags: ["AI Systems", "LLM Engineering", "Architecture"],
    content: [
      "The Epistemic Audit Engine came from frustration with how loosely reliability is discussed in AI systems. Confidence without structure is not enough.",
      "The core idea was to decompose generated text into atomic claims, evaluate them against evidence, and produce verdicts that could be used downstream.",
      "That pushed the system toward middleware thinking. Verification became an operational layer between generation and consumption, not just an offline benchmark.",
    ],
  },
  {
    slug: "what-hackathons-taught-me-about-shipping-ai-products",
    title: "What Hackathons Taught Me About Shipping AI Products",
    summary:
      "Fast constraints, rough prototypes, and the difference between a cool demo and a durable product idea.",
    date: "November 2025",
    readTime: "4 min read",
    tags: ["Startups", "Experiments", "Product Thinking"],
    content: [
      "Hackathons are useful because they collapse decision-making. You find out quickly what matters, what breaks, and what was just performance.",
      "The best lesson is that shipping fast is not the same thing as thinking clearly. The teams that stand out usually have a much sharper model of the user problem than the teams with the most flashy demos.",
      "I keep returning to hackathon projects because they are compressed versions of real product decisions. They expose taste.",
    ],
  },
];

export const blogTopics = [
  "AI Systems",
  "LLM Engineering",
  "Product Thinking",
  "Experiments",
  "Architecture",
  "Startups",
  "Interfaces",
];

export const shortNotes = [
  {
    title: "Systems get interesting at the handoff points.",
    body: "Most product quality is decided where one layer trusts another layer too early.",
  },
  {
    title: "The right abstraction often feels obvious only after the interface exists.",
    body: "A lot of product thinking is really interface research in disguise.",
  },
  {
    title: "I trust metrics more when they change what the product does next.",
    body: "Instrumentation is most useful when it feeds the next decision instead of becoming decoration.",
  },
];

export function getFeaturedPost() {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0];
}

export function getNonFeaturedPosts() {
  return blogPosts.filter((post) => !post.featured);
}

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
