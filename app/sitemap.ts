import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://addyvantage.me"; return ["/home","/work","/blog","/some-fun-things-about-me",...projects.map(p=>`/work/${p.slug}`),...blogPosts.map(p=>`/blog/${p.slug}`)].map(path=>({url:base+path})); }
