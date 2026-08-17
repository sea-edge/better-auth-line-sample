import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { Database } from "bun:sqlite";
import { betterAuth } from "better-auth";

const databasePath = process.env.DATABASE_PATH ?? "./data/auth.sqlite";
mkdirSync(dirname(databasePath), { recursive: true });

const lineClientId = process.env.LINE_CLIENT_ID;
const lineClientSecret = process.env.LINE_CLIENT_SECRET;

export const lineIsConfigured = Boolean(lineClientId && lineClientSecret);

export const auth = betterAuth({
  database: new Database(databasePath),
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ??
    "local-development-secret-change-me-please-32-chars",
  ...(lineIsConfigured
    ? {
        socialProviders: {
          line: {
            clientId: lineClientId!,
            clientSecret: lineClientSecret!,
            mapProfileToUser: (profile) => ({
              email: profile.email ?? `line-${profile.sub}@line.placeholder.local`,
            }),
          },
        },
      }
    : {}),
});
