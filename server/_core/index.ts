import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth.js";
import { registerStorageProxy } from "./storageProxy.js";
import { appRouter } from "../routers.js";
import { createContext } from "./context.js";
import { serveStatic, setupVite } from "./vite.js";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // Storage proxy for /manus-storage/* paths
  registerStorageProxy(app);
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Razorpay webhook for payment status updates
  app.post("/api/razorpay/webhook", async (req, res) => {
    try {
      const crypto = await import("crypto");
      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keySecret) { res.status(500).json({ error: "Razorpay not configured" }); return; }

      // Verify webhook signature
      const webhookSignature = req.headers["x-razorpay-signature"] as string;
      const body = JSON.stringify(req.body);
      const expectedSignature = crypto.createHmac("sha256", keySecret).update(body).digest("hex");

      if (webhookSignature !== expectedSignature) {
        console.error("[Razorpay Webhook] Signature mismatch");
        res.status(400).json({ error: "Invalid signature" });
        return;
      }

      const event = req.body;
      const paymentEntity = event?.payload?.payment?.entity;

      if (event.event === "payment.captured" && paymentEntity) {
        const orderId = paymentEntity.order_id;
        const paymentId = paymentEntity.id;
        const { getDb } = await import("../db");
        const { donations, memorialDonations, occasionDonations } = await import("../../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (db) {
          // Try updating in donations table
          await db.update(donations).set({ status: "completed", razorpayPaymentId: paymentId }).where(eq(donations.razorpayOrderId, orderId));
          // Try updating in memorial donations table
          await db.update(memorialDonations).set({ status: "completed", razorpayPaymentId: paymentId }).where(eq(memorialDonations.razorpayOrderId, orderId));
          // Try updating in occasion donations table
          await db.update(occasionDonations).set({ status: "completed", razorpayPaymentId: paymentId }).where(eq(occasionDonations.razorpayOrderId, orderId));
        }
        console.log(`[Razorpay Webhook] Payment captured: ${paymentId} for order ${orderId}`);
      } else if (event.event === "payment.failed" && paymentEntity) {
        const orderId = paymentEntity.order_id;
        const { getDb } = await import("../db");
        const { donations, memorialDonations, occasionDonations } = await import("../../drizzle/schema");
        const { eq } = await import("drizzle-orm");
        const db = await getDb();
        if (db) {
          await db.update(donations).set({ status: "failed" }).where(eq(donations.razorpayOrderId, orderId));
          await db.update(memorialDonations).set({ status: "failed" }).where(eq(memorialDonations.razorpayOrderId, orderId));
          await db.update(occasionDonations).set({ status: "failed" }).where(eq(occasionDonations.razorpayOrderId, orderId));
        }
        console.log(`[Razorpay Webhook] Payment failed for order ${orderId}`);
      }

      res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("[Razorpay Webhook] Error:", error);
      res.status(500).json({ error: "Webhook processing failed" });
    }
  });
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
