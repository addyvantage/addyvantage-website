import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const delicatus = localFont({ src: "../public/fonts/delicatus.ttf", variable: "--font-delicatus-local", display: "swap" });

const description = "Aditya “Addy” Singh builds operational systems, AI products, and developer tools, including a multi-property hotel PMS and independent builds like PebbleCode and Tuku.";

export const metadata: Metadata = {
  metadataBase: new URL("https://addyvantage.me"),
  title: { default: "Aditya Singh (Addy), software builder", template: "%s · Aditya Singh" },
  description,
  openGraph: { type: "website", siteName: "Aditya Singh / Addy", locale: "en_IN", title: "Aditya Singh (Addy), software builder", description },
  twitter: { card: "summary_large_image", creator: "@addyvantage" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aditya Singh",
  alternateName: "Addy",
  url: "https://addyvantage.me/",
  image: "https://addyvantage.me/images/addy-portrait.webp",
  email: "mailto:build@addyvantage.me",
  jobTitle: "Software builder",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Kalinga Institute of Industrial Technology (KIIT)" },
  sameAs: ["https://github.com/addyvantage", "https://www.linkedin.com/in/addyvantage/", "https://x.com/addyvantage"],
  knowsAbout: ["Software engineering", "AI products", "Developer tools", "Product engineering"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${delicatus.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <ThemeProvider>{children}</ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
