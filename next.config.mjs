/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // ppr: true,
    serverActions: true,
    optimizePackageImports: [
      "@emotion/react",
      "axios",
      "notistack",
      "eslint",
      "prettier",
    ],
  },
  reactStrictMode: true,
  output: "standalone",

  env: {
    BASE_URL_API: "http://172.16.11.24:8080/psya/",

    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      "pk_test_d2lzZS1jaGlja2VuLTAuY2xlcmsuYWNjb3VudHMuZGV2JA",
    CLERK_SECRET_KEY: "sk_test_4ean5LsiDYLn3BuIreOKgqGGEiFTfkAS0DcVCrlDaS",
    POSTGRES_URL:
      "postgres://default:idhEYcq9A3Os@ep-frosty-wood-a2pq1n54-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require",
    POSTGRES_PRISMA_URL:
      "postgres://default:idhEYcq9A3Os@ep-frosty-wood-a2pq1n54-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15",
    POSTGRES_URL_NO_SSL:
      "postgres://default:idhEYcq9A3Os@ep-frosty-wood-a2pq1n54-pooler.eu-central-1.aws.neon.tech:5432/verceldb",
    POSTGRES_URL_NON_POOLING:
      "postgres://default:idhEYcq9A3Os@ep-frosty-wood-a2pq1n54.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require",
  },
};

export default nextConfig;
