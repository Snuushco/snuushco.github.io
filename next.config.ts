import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/kassie-mc",
        destination: "https://mijn.kassieapp.nl/kassie-mc",
        permanent: false,
      },
      {
        source: "/verwerkersovereenkomst",
        destination: "https://mijn.kassieapp.nl/verwerkersovereenkomst",
        permanent: false,
      },
      {
        source: "/subprocessors",
        destination: "https://mijn.kassieapp.nl/subprocessors",
        permanent: false,
      },
      {
        source: "/security",
        destination: "https://mijn.kassieapp.nl/security",
        permanent: false,
      },
      {
        source: "/blog/:slug*",
        destination: "https://mijn.kassieapp.nl/blog/:slug*",
        permanent: false,
      },
      {
        source: "/login",
        destination: "https://mijn.kassieapp.nl/login",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "https://mijn.kassieapp.nl/signup",
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
