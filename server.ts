import { auth, lineIsConfigured } from "./auth";

const port = Number(process.env.PORT ?? 3000);
const index = Bun.file(new URL("./public/index.html", import.meta.url));

const server = Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/auth/")) {
      return auth.handler(request);
    }

    if (url.pathname === "/health") {
      return Response.json({ ok: true });
    }

    if (url.pathname === "/config") {
      return Response.json({ lineConfigured: lineIsConfigured });
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(index, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
});

console.log(`Better Auth + LINE sample: ${server.url}`);
console.log(
  lineIsConfigured
    ? "LINE Login is configured."
    : "LINE Login is not configured. Copy .env.example to .env and add LINE credentials.",
);
