import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth.js";
import { registerStorageProxy } from "../server/_core/storageProxy.js";
import { appRouter } from "../server/routers.js";
import { createContext } from "../server/_core/context.js";

const app = express();

// ─── Environment Variable Validation ───────────────────────────────────────
const REQUIRED_ENV_VARS = ["DATABASE_URL", "JWT_SECRET"];

const OPTIONAL_ENV_VARS = [
  "VITE_APP_ID",
  "OAUTH_SERVER_URL",
  "VITE_OAUTH_PORTAL_URL",
  "OWNER_OPEN_ID",
  "BUILT_IN_FORGE_API_URL",
  "BUILT_IN_FORGE_API_KEY",
];

const missingRequired = REQUIRED_ENV_VARS.filter(key => !process.env[key]);
const missingOptional = OPTIONAL_ENV_VARS.filter(key => !process.env[key]);

if (missingRequired.length > 0) {
  console.error(
    `[FATAL] Missing required environment variables: ${missingRequired.join(", ")}. ` +
      `The API will return 503 for all requests until these are configured.`
  );
}

if (missingOptional.length > 0) {
  console.warn(
    `[WARN] Missing optional environment variables: ${missingOptional.join(", ")}. ` +
      `Some features (auth, notifications, LLM) may not work.`
  );
}

// ─── Health Check ──────────────────────────────────────────────────────────
app.get("/api/health", (_req: Request, res: Response) => {
  if (missingRequired.length > 0) {
    res.status(503).json({
      status: "unhealthy",
      message: "Missing required environment variables",
      missing: missingRequired,
    });
  } else {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
    });
  }
});

// ─── Guard: Block all API routes if critical env vars are missing ───────────
if (missingRequired.length > 0) {
  app.use("/api", (_req: Request, res: Response) => {
    res.status(503).json({
      error: "Service Unavailable",
      message:
        "Server is not properly configured. Required environment variables are missing.",
      details: `Missing: ${missingRequired.join(", ")}`,
    });
  });
} else {
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Storage proxy for /manus-storage/* paths
  registerStorageProxy(app);

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
}

// ─── Global Error Handler ──────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[API Error]", err.message, err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred. Please try again later."
        : err.message,
  });
});

// Export for Vercel serverless
export default app;
