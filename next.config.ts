import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "/" is canonical; keep old /home links working.
  async redirects() {
    return [{ source: "/home", destination: "/", permanent: true }];
  },
};

export default nextConfig;
