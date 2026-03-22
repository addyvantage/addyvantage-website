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
    institution: "Modern School, Barakhamba Road, New Delhi",
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
    <main className="min-h-screen pb-28 sm:pb-32" id="home">
      <section
        aria-label="Home section"
        className="mx-auto flex w-full max-w-4xl items-start px-5 pb-4 pt-12 sm:px-6 sm:pt-14 md:min-h-[32vh] md:px-8 md:pb-8 md:pt-20 lg:px-10"
        id="home"
      >
        <div className="mt-3 grid w-full grid-cols-[minmax(0,1fr)_88px] items-start gap-x-4 gap-y-3 sm:mt-5 sm:grid-cols-[minmax(0,1fr)_96px] sm:gap-x-5 md:mt-12 md:flex md:items-center md:gap-10 md:pl-28">
          <div className="min-w-0 max-w-[14.5rem] sm:max-w-[18rem] md:max-w-xl">
            <h1 className="flex items-start gap-1.5 font-sans text-[2.1rem] font-medium leading-[1.02] tracking-tight text-black dark:text-white sm:gap-2 sm:text-[2.4rem] md:gap-3 md:text-4xl lg:text-5xl">
              <span className="max-w-[7.4ch] sm:max-w-[8ch] md:max-w-none">Hey there, addy here</span>
              <HandIcon
                aria-hidden="true"
                className="mt-1 shrink-0 scale-[0.62] text-black dark:text-white sm:scale-[0.68] md:-translate-y-1 md:scale-100"
                size={48}
              />
            </h1>
            <div className="mt-2.5 max-w-[14rem] text-[1.04rem] leading-[1.12] text-neutral-500 dark:text-neutral-400 sm:max-w-[18rem] sm:text-[1.16rem] md:mt-0 md:max-w-xl md:text-[1.75rem]">
              <div className="flex flex-wrap items-baseline gap-x-0 gap-y-1">
                <span>currently&nbsp;</span>
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
                  className="max-w-full text-neutral-500 dark:text-neutral-400"
                  cursorChar="|"
                  cursorClassName="text-neutral-400 dark:text-neutral-500"
                />
              </div>
            </div>
          </div>
          <div className="relative col-start-2 row-span-2 mt-1 h-[88px] w-[88px] justify-self-end overflow-hidden rounded-full border border-neutral-200/80 bg-neutral-100 shadow-sm dark:border-neutral-700/80 dark:bg-neutral-900 sm:h-[96px] sm:w-[96px] md:mt-0 md:h-[112px] md:w-[112px]">
            <Image
              alt="Addy profile image"
              className="object-cover"
              fill
              priority
              sizes="(max-width: 640px) 88px, (max-width: 768px) 96px, 112px"
              src={profileImage}
            />
          </div>
        </div>
      </section>
      <section
        aria-label="About section"
        className="mx-auto mt-10 w-full max-w-4xl px-5 sm:mt-12 sm:px-6 md:mt-4 md:px-8 lg:px-10"
        id="about"
      >
        <div className="w-full md:pl-28">
          <h2 className="mb-0 text-[1.02rem] font-semibold text-black dark:text-white sm:text-lg md:text-[1.5rem]">
            about me
          </h2>
          <div className="max-w-[34rem] space-y-3 text-[1.08rem] leading-[1.55] text-neutral-500 dark:text-neutral-400 sm:text-[1.12rem] md:max-w-2xl md:text-[1.25rem] md:leading-6">
            <p>
              i&apos;ve always been fascinated by the internet.
            </p>
            <p>
              a small group of people can build something once and suddenly it
              exists everywhere.
              <br className="hidden md:block" />
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
        className="mx-auto mt-12 w-full max-w-4xl px-5 sm:mt-14 sm:px-6 md:px-8 lg:px-10"
      >
        <div className="w-full md:pl-28">
          <h2 className="text-[1.02rem] font-semibold text-black dark:text-white sm:text-lg md:text-[1.5rem]">
            things i&apos;ve built
          </h2>
          <p className="mt-1 text-[0.98rem] text-neutral-500 dark:text-neutral-400 sm:text-[1.02rem] md:text-[1.1rem]">
            a few things i&apos;ve been building recently
          </p>
          <div className="mt-6 max-w-[34rem] space-y-8 sm:mt-7 sm:space-y-9 md:max-w-2xl">
            {builtThings.map((project) => (
              <div key={project.title}>
                {project.href ? (
                  <ProjectLinkTitle href={project.href} title={project.title} />
                ) : (
                  <div className="text-black dark:text-white">
                    <h3 className="text-[1.38rem] font-semibold tracking-tight sm:text-[1.48rem] md:text-[1.58rem]">
                      {project.title}
                    </h3>
                  </div>
                )}
                <p className="mt-1 text-[1.04rem] text-neutral-600 dark:text-neutral-300 sm:text-[1.12rem] md:text-[1.28rem]">
                  {project.description}
                </p>
                <div className="mt-2.5">
                  <div className="space-y-2">
                    {project.points.map((point, index) => (
                      <div key={point} className="relative pl-6">
                        {project.title !== "small experiments" && index < project.points.length - 1 ? (
                          <span className="absolute left-[2.5px] top-[0.76rem] h-[calc(100%+0.5rem)] w-px bg-black dark:bg-white" />
                        ) : null}
                        <span className="absolute left-0 top-[0.58rem] h-1.5 w-1.5 rounded-full bg-black dark:bg-white" />
                        <p className="text-[1rem] leading-relaxed text-neutral-500 dark:text-neutral-400 sm:text-[1.04rem] md:text-[1.16rem]">
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
        className="mx-auto mt-14 w-full max-w-4xl px-5 sm:mt-16 sm:px-6 md:mt-20 md:px-8 lg:px-10"
      >
        <div className="w-full md:pl-28">
          <h2 className="text-[1.02rem] font-semibold text-black dark:text-white sm:text-lg md:text-[1.5rem]">
            education
          </h2>
          <div className="mt-5 max-w-[34rem] space-y-4 sm:mt-6 sm:space-y-5 md:max-w-2xl">
            {education.map((entry) => (
                <div
                key={entry.institution}
                className="flex items-start gap-3 sm:gap-4 md:gap-5"
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14 ${entry.logoClassName}`}
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
                  <h3 className="text-[1rem] font-medium text-black dark:text-white sm:text-[1.06rem] md:text-[1.22rem]">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 text-[0.96rem] text-neutral-500 dark:text-neutral-400 sm:text-[1rem] md:text-[1.12rem]">
                    {entry.program}
                  </p>
                </div>
                <div className="shrink-0 pt-0.5 text-right text-[0.86rem] text-neutral-500 dark:text-neutral-400 sm:text-[0.92rem] md:text-[1.08rem]">
                  {entry.years}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-label="Tools I use section"
        className="mx-auto mt-14 w-full max-w-4xl px-5 sm:mt-16 sm:px-6 md:px-8 lg:px-10"
      >
        <div className="w-full md:pl-28">
          <h2 className="text-[1.02rem] font-semibold text-black dark:text-white sm:text-lg md:text-[1.5rem]">
            tools i use
          </h2>
          <div className="mt-5 flex max-w-[34rem] flex-wrap gap-x-3 gap-y-2 sm:mt-6 sm:gap-x-4 sm:gap-y-2.5 md:max-w-2xl">
            {tools.map((tool) => (
              <span
                key={tool}
                className="pixel-capsule min-h-[28px] px-2.5 py-0 text-[0.98rem] font-medium text-black dark:text-white sm:min-h-[30px] sm:px-3 sm:text-[1.04rem]"
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
                  <span className="pixel-capsule-segment pixel-capsule-notch-top-left" />
                  <span className="pixel-capsule-segment pixel-capsule-notch-top-right" />
                  <span className="pixel-capsule-segment pixel-capsule-notch-bottom-left" />
                  <span className="pixel-capsule-segment pixel-capsule-notch-bottom-right" />
                </span>
                <span className="pixel-capsule-label">{tool}</span>
              </span>
            ))}
          </div>
        </div>
      </section>
      <section
        aria-label="Closing CTA section"
        className="mx-auto mt-16 w-full max-w-4xl px-5 pb-20 sm:mt-20 sm:px-6 md:mt-24 md:px-8 md:pb-24 lg:px-10"
      >
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <span className="h-1.5 w-14 rounded-full bg-neutral-900/80 dark:bg-white/75" />
          <div className="flex items-center justify-center gap-2 text-center text-[1.28rem] tracking-tight text-neutral-700 dark:text-neutral-200 sm:text-[1.45rem] md:text-[1.9rem]">
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
