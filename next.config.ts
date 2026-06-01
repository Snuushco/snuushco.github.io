import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "https://mijn.kassieapp.nl/login",
        permanent: false,
      },
      {
        source: "/register",
        destination: "https://mijn.kassieapp.nl/register",
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        destination: "https://mijn.kassieapp.nl/dashboard/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
