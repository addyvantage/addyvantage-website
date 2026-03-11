import { AppleStyleDock } from "@/components/ui/demo";

const things = [
  "curiosity is the best teacher",
  "code is one of the highest forms of leverage",
  "the internet lets small ideas reach millions",
  "learning fast matters more than knowing a lot",
  "shipping small things consistently beats big ideas",
  "good software design matters",
  "building things on the internet is fun",
];

export default function ThingsAboutMePage() {
  return (
    <main className="min-h-screen pb-32 pt-16 md:pt-20" id="things-about-me">
      <section className="mx-auto w-full max-w-4xl px-6 md:px-8 lg:px-10">
        <div className="w-full pl-16 md:pl-28">
          <h1 className="text-3xl font-medium leading-[1.05] tracking-tight text-black dark:text-white md:text-4xl lg:text-5xl">
            some fun things about me
          </h1>
          <ul className="mt-8 max-w-2xl list-disc space-y-4 pl-6 text-lg leading-7 text-neutral-500 dark:text-neutral-400 md:text-[1.25rem]">
            {things.map((thing) => (
              <li key={thing}>{thing}</li>
            ))}
          </ul>
        </div>
      </section>
      <AppleStyleDock />
    </main>
  );
}
