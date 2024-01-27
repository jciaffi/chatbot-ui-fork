const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost"
      },
      {
        protocol: "http",
        hostname: "127.0.0.1"
      },
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
    serverComponentsExternalPackages: ["sharp", ] // "onnxruntime-node"] // Pour le build
  },
  // Comlis, temporaire
  typescript: {
    // !! WARN !!
    // Dangerously allow the production build to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/fr/chat',
        permanent: true,
      },
      {
        source: '/pharmnature',
        destination: '/fr/pharmnature/login',
        permanent: true,
      },
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'chatbot.pharmnaturemicronutrition.fr',
          }],
        destination: '/fr/pharmnature/login',
        permanent: true,
      },
    ]
  }
})
