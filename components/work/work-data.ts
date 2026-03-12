export type WorkTimelineItem = {
  id: string;
  startDate: string;
  endDate: string;
  dateLabel: string;
  tagline: string;
  heading: string;
  description: string;
  details: string;
  skills: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const workTimelineData: WorkTimelineItem[] = [
  {
    id: "pebblecode",
    startDate: "2026-02-26",
    endDate: "2026-03-12",
    dateLabel: "Feb '26",
    tagline: "Feb 2026 - Present",
    heading: "PebbleCode",
    description:
      "Recovery-first coding practice platform with contextual AI mentor guidance and an integrated IDE workflow.",
    details:
      "Built PebbleCode, a recovery-first coding practice system designed around the real learning loop: run -> diagnose -> recover -> rerun. The platform combines a Monaco-based coding IDE, contextual AI mentor powered by Amazon Bedrock, multilingual learning interfaces, and progression analytics into a unified workflow. The system is built on a serverless AWS architecture using Cognito authentication, API Gateway, Lambda execution paths, DynamoDB storage, and S3 asset hosting. The AI mentor provides context-aware hints, explanations, and next-step guidance grounded in the user's current code and runtime results. PebbleCode also includes an insights dashboard that tracks recovery metrics, streaks, and learning progression.",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Monaco Editor",
      "Amazon Bedrock",
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "S3",
      "Cognito",
    ],
    liveUrl: "https://main.d2c2alvh2q833h.amplifyapp.com/",
    githubUrl: "https://github.com/addyvantage/pebble-prototype-dev",
  },
  {
    id: "epistemic-audit-engine",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
    dateLabel: "Dec '25",
    tagline: "Dec 2025",
    heading: "Epistemic Audit Engine",
    description:
      "Claim-level verification middleware for detecting hallucinations in long-form LLM outputs.",
    details:
      "Designed and implemented a runtime verification system for auditing LLM-generated text at claim level before downstream consumption. The engine extracts atomic claims from generated responses and verifies them against evidence sources, producing structured reliability signals including hallucination scores and claim-level verdicts such as Supported, Refuted, and Uncertain. Built with an async FastAPI pipeline capable of auditing large generated responses while maintaining high throughput. Includes runtime logging for evaluation dataset construction and a research harness for reproducible benchmarking.",
    skills: [
      "Python",
      "FastAPI",
      "Async Pipelines",
      "LLM Evaluation",
      "Verification Middleware",
      "Structured Outputs",
    ],
    githubUrl: "https://github.com/addyvantage/Epistemic-Audit-Engine",
  },
  {
    id: "nus-data-analytics",
    startDate: "2025-06-01",
    endDate: "2025-07-31",
    dateLabel: "Jun '25",
    tagline: "Jun 2025 - Jul 2025",
    heading: "Data Analytics (National University of Singapore)",
    description:
      "Ran analytics, preprocessing, and reporting workflows on large Airbnb datasets during the NUS Global Immersion Programme.",
    details:
      "Performed exploratory data analysis and statistical testing on 10k+ Airbnb records, engineered predictive features, and improved modeling quality. Built Python preprocessing pipelines with validation rules to reduce processing errors and improve reliability. Published Power BI dashboards and automated reporting workflows that accelerated stakeholder analysis and review cycles.",
    skills: [
      "Python",
      "Power BI",
      "Excel",
      "EDA",
      "Statistical Testing",
      "Data Validation",
    ],
  },
  {
    id: "fairhire-ai",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    dateLabel: "Sep '25",
    tagline: "Sep 2025",
    heading: "FairHire AI",
    description:
      "AI-driven resume analysis platform with asynchronous inference pipelines and full observability stack.",
    details:
      "Developed a production-style resume intelligence platform designed to evaluate candidate resumes using asynchronous LLM analysis pipelines. The system decouples API ingestion from heavy inference workloads using Redis-backed job orchestration and background worker execution. Includes observability through Prometheus metrics and Grafana dashboards for monitoring worker utilization, queue depth, and inference throughput. Built as a containerized multi-service environment using Docker Compose.",
    skills: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "RQ",
      "Prometheus",
      "Grafana",
      "Docker",
    ],
    githubUrl: "https://github.com/addyvantage/fairhire-ai",
  },
  {
    id: "deallens-ai",
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    dateLabel: "Apr '25",
    tagline: "Apr 2025",
    heading: "DealLens AI",
    description:
      "Async document-analysis platform for screening financial deals in M&A pipelines.",
    details:
      "Built an asynchronous document analysis backend designed for high-throughput financial deal screening workflows. The system processes uploaded financial documents through a Celery-based background worker architecture, enabling long-running parsing and reasoning tasks without blocking API response cycles. Supports async job submission, status tracking, structured logging, and retryable task execution for resilience under heavy workloads.",
    skills: [
      "Python",
      "FastAPI",
      "Celery",
      "Redis",
      "Async Jobs",
      "Document Analysis",
    ],
    githubUrl: "https://github.com/addyvantage/DealLens-AI-MA-Screener",
  },
  {
    id: "sukrit-data-science",
    startDate: "2024-12-01",
    endDate: "2025-01-31",
    dateLabel: "Dec '24",
    tagline: "Dec 2024 - Jan 2025",
    heading: "Data Science Intern (Sukrit Technologies)",
    description:
      "Built modular Python/SQL data pipelines and improved reporting speed during a short on-site internship.",
    details:
      "Developed modular Python and SQL data pipelines with logging and validation layers to improve runtime efficiency and maintainability. Optimized SQL queries using joins, CTEs, and window functions to reduce reporting latency. Implemented automated validation tests and improved documentation workflows to reduce downstream data errors and rework.",
    skills: [
      "Python",
      "SQL",
      "Excel",
      "Data Pipelines",
      "Validation",
      "Reporting",
    ],
  },
];
