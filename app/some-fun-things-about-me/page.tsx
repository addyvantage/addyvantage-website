import Image from "next/image";
import Link from "next/link";

import ArrowNarrowLeftIcon from "@/components/icons/arrow-narrow-left-icon";
import { AppleStyleDock } from "@/components/ui/demo";

const things = [
  "curiosity is the best teacher",
  "code is one of the highest forms of leverage",
  "the internet lets small ideas reach millions",
  "learning fast matters more than knowing a lot",
  "shipping small things consistently beats big ideas",
  "good software design matters",
  "building things on the internet is fun",
  "i used to perform the indian classical flute when i was younger",
];

export default function ThingsAboutMePage() {
  return (
    <main className="min-h-screen pb-32 pt-16 md:pt-20" id="some-fun-things-about-me">
      <section className="mx-auto w-full max-w-4xl px-6 md:px-8 lg:px-10">
        <div className="w-full pl-16 md:pl-28">
          <div className="relative">
            <Link
              aria-label="Go to home"
              className="absolute top-1/2 -left-16 -translate-y-[44%] text-black transition-colors hover:text-neutral-700 dark:text-white dark:hover:text-neutral-300 md:-left-20"
              href="/home"
            >
              <ArrowNarrowLeftIcon className="h-14 w-14 md:h-16 md:w-16" size={56} />
            </Link>
            <h1 className="text-3xl font-medium leading-[1.05] tracking-tight text-black dark:text-white md:text-4xl lg:text-5xl">
              some fun things about me
            </h1>
          </div>
          <ul className="mt-8 max-w-2xl list-disc space-y-4 pl-6 text-lg leading-7 text-neutral-500 dark:text-neutral-400 md:text-[1.25rem]">
            {things.map((thing) => (
              <li key={thing}>{thing}</li>
            ))}
          </ul>
          <div className="mt-8 w-full">
            <div className="w-full max-w-[360px]">
              <p className="mb-5 text-lg leading-7 text-neutral-500 dark:text-neutral-400 md:text-[1.25rem]">
                yep, that&apos;s me.
              </p>
              <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10">
                <Image
                  alt="A younger Aditya performing Indian classical flute"
                  className="h-auto w-full object-cover"
                  height={533}
                priority={false}
                  src="/images/indian-classical-flute.jpeg"
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppleStyleDock />
    </main>
  );
}
