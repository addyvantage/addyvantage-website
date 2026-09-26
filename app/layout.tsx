import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://addyvantage.me"),
  title: { default: "Aditya Singh (Addy) — Software builder", template: "%s" },
  description: "Aditya Singh builds AI systems, developer tools, and useful interfaces with attention to the whole product loop.",
  openGraph: { type: "website", siteName: "Aditya Singh / Addy", locale: "en_IN", images: [{url: "/og.png", width: 1200, height: 630, alt: "Aditya Singh: software for the moments after the first answer"}] },
  twitter: { card: "summary_large_image", creator: "@addyvantage", images: ["/og.png"] },
  icons: { icon: "/icon.png" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><a className="skip-link" href="#main-content">Skip to content</a><ThemeProvider>{children}</ThemeProvider><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: "Aditya Singh", alternateName: "Addy", url: "https://addyvantage.me/home", sameAs: ["https://github.com/addyvantage", "https://www.linkedin.com/in/addyvantage/"], knowsAbout: ["Software engineering", "AI systems", "Developer tools"] }) }} /></body></html>;
}
