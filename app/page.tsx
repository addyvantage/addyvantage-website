import Image from "next/image";
import Link from "next/link";
import { HandIcon } from "@/components/hand-icon";
import { AppleStyleDock } from "@/components/ui/demo";
import { Typewriter } from "@/components/ui/typewriter";
import profileImage from "../X-pfp.jpg";

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
                className="text-black transition-colors hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300"
                href="/things-about-me"
              >
                some fun things about me
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <section className="min-h-screen" aria-label="Work section" id="work" />
      <section className="min-h-screen" aria-label="Blog section" id="blog" />
      <AppleStyleDock />
    </main>
  );
}
