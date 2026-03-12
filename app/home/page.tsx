import Image from "next/image";
import Link from "next/link";
import { HandIcon } from "@/components/hand-icon";
import TwitterXIcon from "@/components/icons/twitter-x-icon";
import { ProjectLinkTitle } from "@/components/project-link-title";
import { AppleStyleDock } from "@/components/ui/demo";
import { Typewriter } from "@/components/ui/typewriter";
import profileImage from "../../X-pfp.jpg";

const builtThings = [
  {
    title: "mcp zero",
    description: "visual playground for model context protocol",
    points: [
      "makes mcp easier to understand through interactive flows",
      "helps developers test servers and hosts quickly",
      "built as an open playground for learning the protocol",
    ],
  },
  {
    title: "pebblecode",
    description: "ai learning companion for coding recovery",
    href: "https://main.d2c2alvh2q833h.amplifyapp.com/",
    points: [
      "detects struggle during coding sessions",
      "gives layered hints instead of instant answers",
      "built to help people recover from mistakes faster",
    ],
  },
  {
    title: "small experiments",
    description: "agents, interfaces, and internet tools",
    points: [
      "small prototypes around agent workflows",
      "ui experiments and tiny devtools",
      "most of them begin as late-night ideas",
    ],
  },
];

const education = [
  {
    institution: "KIIT (Kalinga Institute of Industrial Technology)",
    program: "B.Tech Computer Science & Systems Engineering",
    years: "2022 - present",
    logo: "/images/kiit-logo.png",
    logoAlt: "KIIT logo",
    logoClassName: "bg-white",
    imageClassName: "translate-y-1.5 h-[96%] w-[96%] object-contain",
  },
  {
    institution: "Modern School, Barakhamba Road",
    program: "school education",
    years: "graduated 2022",
    logo: "/images/msbk-logo.jpg",
    logoAlt: "Modern School, Barakhamba Road logo",
    logoClassName: "bg-[#111111]",
    imageClassName: "h-[110%] w-[110%] object-contain",
  },
];

const tools = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "NoSQL",
  "Docker",
  "Git",
  "LLM APIs",
  "MCP",
  "Figma",
];

const xUrl = "https://x.com/addyvantage";

export default function HomePage() {
  return (
    <main className="min-h-screen pb-32" id="home">
      <section
        aria-label="Home section"
        className="mx-auto flex min-h-[36vh] w-full max-w-4xl items-start px-6 pt-16 pb-6 md:min-h-[32vh] md:px-8 md:pt-20 md:pb-8 lg:px-10"
        id="home"
      >
        <div className="mt-10 flex w-full flex-col items-start gap-8 pl-16 md:mt-12 md:flex-row md:items-center md:gap-10 md:pl-28">
          <div className="max-w-xl">
            <h1 className="flex items-center gap-2 font-sans text-3xl font-medium leading-[1.05] tracking-tight text-black dark:text-white md:gap-3 md:text-4xl lg:text-5xl">
              <span>Hey there, addy here</span>
              <HandIcon
                aria-hidden="true"
                className="-translate-y-1 shrink-0 text-black dark:text-white"
                size={48}
              />
            </h1>
            <div className="mt-0 max-w-xl text-xl leading-tight text-neutral-500 dark:text-neutral-400 md:text-[1.75rem]">
              <div className="inline-flex items-baseline gap-0">
                <span>{"currently\u00A0"}</span>
                <Typewriter
                  text={[
                    "building MCPZero",
                    "thinking about agentic AI",
                    "exploring developer tooling",
                    "optimizing leverage",
                    "learning distributed systems",
                  ]}
                  speed={55}
                  deleteSpeed={28}
                  waitTime={1800}
                  initialDelay={300}
                  className="text-neutral-500 dark:text-neutral-400"
                  cursorChar="|"
                  cursorClassName="text-neutral-400 dark:text-neutral-500"
                />
              </div>
            </div>
          </div>
          <div className="relative h-[96px] w-[96px] overflow-hidden rounded-full border border-neutral-200/80 bg-neutral-100 shadow-sm dark:border-neutral-700/80 dark:bg-neutral-900 md:h-[112px] md:w-[112px]">
            <Image
              alt="Addy profile image"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 96px, 112px"
              src={profileImage}
            />
          </div>
        </div>
      </section>
      <section
        aria-label="About section"
        className="mx-auto mt-4 w-full max-w-4xl px-6 md:px-8 lg:px-10"
        id="about"
      >
        <div className="w-full pl-16 md:pl-28">
          <h2 className="mb-0 text-lg font-semibold text-black dark:text-white md:text-[1.5rem]">
            about me
          </h2>
          <div className="max-w-2xl space-y-3 text-lg leading-6 text-neutral-500 dark:text-neutral-400 md:text-[1.25rem]">
            <p>
              i&apos;ve always been fascinated by the internet.
            </p>
            <p>
              a small group of people can build something once and suddenly it
              exists everywhere.
              <br />
              in thousands of browsers and millions of pockets.
            </p>
            <p>
              most of what i know didn&apos;t come from classrooms. it came
              from curiosity. breaking things, rebuilding them, and trying to
              understand the systems underneath.
            </p>
            <p>
              these days i&apos;m exploring ai native products, developer
              tooling, and software that helps people think and create better.
            </p>
            <p>
              right now i&apos;m experimenting, building things, and learning
              as fast as i can.
            </p>
            <p>
              if you&apos;re curious, here are{" "}
              <Link
                className="squiggle text-black transition-colors hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
                href="/some-fun-things-about-me"
              >
                some fun things about me
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <section
        aria-label="Things I've built section"
        className="mx-auto mt-14 w-full max-w-4xl px-6 md:px-8 lg:px-10"
      >
        <div className="w-full pl-16 md:pl-28">
          <h2 className="text-lg font-semibold text-black dark:text-white md:text-[1.5rem]">
            things i&apos;ve built
          </h2>
          <p className="mt-1 text-[1.05rem] text-neutral-500 dark:text-neutral-400 md:text-[1.1rem]">
            a few things i&apos;ve been building recently
          </p>
          <div className="mt-7 max-w-2xl space-y-9">
            {builtThings.map((project) => (
              <div key={project.title}>
                {project.href ? (
                  <ProjectLinkTitle href={project.href} title={project.title} />
                ) : (
                  <div className="text-black dark:text-white">
                    <h3 className="text-[1.6rem] font-semibold tracking-tight md:text-[1.58rem]">
                      {project.title}
                    </h3>
                  </div>
                )}
                <p className="mt-1 text-[1.2rem] text-neutral-500 dark:text-neutral-400 md:text-[1.28rem]">
                  {project.description}
                </p>
                <div className="mt-2.5">
                  <div className="space-y-2">
                    {project.points.map((point, index) => (
                      <div key={point} className="relative pl-6">
                        {project.title !== "small experiments" && index < project.points.length - 1 ? (
                          <span className="absolute left-[2.5px] top-[0.76rem] h-[calc(100%+0.5rem)] w-px bg-neutral-500/60 dark:bg-neutral-300/55" />
                        ) : null}
                        <span className="absolute left-0 top-[0.58rem] h-1.5 w-1.5 rounded-full bg-neutral-500/85 dark:bg-neutral-300/80" />
                        <p className="text-[1.1rem] leading-relaxed text-neutral-400/95 dark:text-neutral-500 md:text-[1.16rem]">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-label="Education section"
        className="mx-auto mt-20 w-full max-w-4xl px-6 md:px-8 lg:px-10"
      >
        <div className="w-full pl-16 md:pl-28">
          <h2 className="text-lg font-semibold text-black dark:text-white md:text-[1.5rem]">
            education
          </h2>
          <div className="mt-6 max-w-2xl space-y-5">
            {education.map((entry) => (
                <div
                key={entry.institution}
                className="flex items-start gap-4 md:gap-5"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full ${entry.logoClassName}`}
                >
                  <Image
                    alt={entry.logoAlt}
                    className={entry.imageClassName}
                    height={40}
                    sizes="56px"
                    src={entry.logo}
                    width={40}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.12rem] font-medium text-black dark:text-white md:text-[1.22rem]">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 text-[1.06rem] text-neutral-500 dark:text-neutral-400 md:text-[1.12rem]">
                    {entry.program}
                  </p>
                </div>
                <div className="shrink-0 pt-0.5 text-right text-[1.02rem] text-neutral-500 dark:text-neutral-400 md:text-[1.08rem]">
                  {entry.years}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-label="Tools I use section"
        className="mx-auto mt-16 w-full max-w-4xl px-6 md:px-8 lg:px-10"
      >
        <div className="w-full pl-16 md:pl-28">
          <h2 className="text-lg font-semibold text-black dark:text-white md:text-[1.5rem]">
            tools i use
          </h2>
          <div className="mt-6 flex max-w-2xl flex-wrap gap-x-4 gap-y-2.5">
            {tools.map((tool) => (
              <span
                key={tool}
                className="pixel-capsule min-h-[30px] px-3 py-0 text-[1.04rem] font-medium text-black dark:text-white"
              >
                <span aria-hidden="true" className="pixel-capsule-frame">
                  <span className="pixel-capsule-segment pixel-capsule-top" />
                  <span className="pixel-capsule-segment pixel-capsule-bottom" />
                  <span className="pixel-capsule-segment pixel-capsule-left" />
                  <span className="pixel-capsule-segment pixel-capsule-right" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-top-left" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-top-right" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-bottom-left" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-bottom-right" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-left-top" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-right-top" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-left-bottom" />
                  <span className="pixel-capsule-segment pixel-capsule-corner-right-bottom" />
                </span>
                <span className="pixel-capsule-label">{tool}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-label="Closing CTA section"
        className="mx-auto mt-24 w-full max-w-4xl px-6 pb-20 md:px-8 md:pb-24 lg:px-10"
      >
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <span className="h-1.5 w-14 rounded-full bg-neutral-900/80 dark:bg-white/75" />
          <div className="flex items-center justify-center gap-2 text-center text-[1.6rem] tracking-tight text-neutral-700 dark:text-neutral-200 md:text-[1.9rem]">
            <span>say hi to me on</span>
            <a
              aria-label="Say hi to me on X"
              className="inline-flex translate-y-[1px] items-center text-neutral-950 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
              href={xUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <TwitterXIcon loop size={28} />
            </a>
          </div>
        </div>
      </section>
      <section className="h-px" aria-label="Work section" id="work" />
      <section className="h-px" aria-label="Blog section" id="blog" />
      <AppleStyleDock />
    </main>
  );
}
