# Railway Deployment Guide — Abhiara Foundation

This project is a **full-stack Node.js application** (Express + tRPC + React). It requires a Node.js server runtime, not static hosting. Railway is the recommended external hosting platform.

## Architecture

The production build produces two outputs:

| Output | Path | Description |
|--------|------|-------------|
| Server | `dist/index.js` | Express server (tRPC API + OAuth + static file serving) |
| Client | `dist/public/` | Vite-built React SPA (served by the Express server) |

The Express server serves both the API and the frontend from a single process.

## Step-by-Step Railway Setup

### 1. Create a New Project on Railway

1. Go to [railway.app](https://railway.app) and sign in.
2. Click **New Project** and select **Deploy from GitHub repo**.
3. Select the repository: `cmaabhimanyu-sys/ABHIARA-FOUNDATION-MUMBAI-ODISHA`.
4. Railway will auto-detect the `railway.json` configuration.

### 2. Set Environment Variables

In the Railway service settings, add the following environment variables. All are **required** for the site to function:

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `PORT` | Server port (Railway sets this automatically) | Railway auto-injects this |
| `NODE_ENV` | Must be `production` | Set to `production` |
| `DATABASE_URL` | MySQL/TiDB connection string | Your database provider (e.g., PlanetScale, TiDB Cloud) |
| `JWT_SECRET` | Secret key for signing session cookies | Generate a random 64-char string |
| `VITE_APP_ID` | Manus OAuth application ID | From Manus project settings |
| `OAUTH_SERVER_URL` | Manus OAuth backend URL | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | Manus login portal URL | From Manus project settings |
| `OWNER_OPEN_ID` | Owner's Manus OpenID | From Manus project settings |
| `OWNER_NAME` | Owner's display name | Your name |
| `BUILT_IN_FORGE_API_URL` | Manus built-in API URL | From Manus project settings |
| `BUILT_IN_FORGE_API_KEY` | Manus built-in API key | From Manus project settings |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend Manus API key | From Manus project settings |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend Manus API URL | From Manus project settings |
| `VITE_ANALYTICS_ENDPOINT` | Analytics endpoint URL | From Manus project settings (optional) |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics website ID | From Manus project settings (optional) |

> **Important:** Variables prefixed with `VITE_` are embedded into the frontend at **build time**. If you change them, you must trigger a **redeploy** (not just restart).

### 3. Verify Build & Start Commands

Railway should auto-detect these from `railway.json`:

- **Build command:** `corepack enable && pnpm install --frozen-lockfile && pnpm build`
- **Start command:** `pnpm start`

If Railway does not pick these up, set them manually in the service settings.

### 4. Custom Domain

1. In Railway service settings, go to **Settings > Networking > Public Networking**.
2. Click **Generate Domain** to get a `*.up.railway.app` domain.
3. To use `abhiarafoundation.com`:
   - Add the custom domain in Railway.
   - Update your DNS records (CNAME) to point to the Railway-provided target.

### 5. Database

This project uses MySQL. You can either:

- **Add a MySQL service in Railway** (Railway > New > Database > MySQL) and use the auto-generated `DATABASE_URL`.
- **Use an external database** (TiDB Cloud, PlanetScale) and set `DATABASE_URL` manually.

After setting the database URL, run migrations by connecting to your Railway service shell:

```bash
pnpm db:push
```

## Troubleshooting

**Site shows raw source code:** The build command did not run, or `NODE_ENV` is not set to `production`. Check the deploy logs.

**Blank page / 404:** The `dist/public/` directory was not generated. Check that `pnpm build` succeeds in the deploy logs.

**API errors / OAuth not working:** Environment variables are missing or incorrect. Check all `VITE_*` and `OAUTH_*` variables.

**Database connection errors:** Verify `DATABASE_URL` is correct and the database is accessible from Railway's network.

## Why Not Vercel?

Vercel is designed for static sites and serverless functions. This project uses a **long-running Express server** that serves both the API and frontend. Vercel cannot run this architecture natively, which is why it shows raw source code instead of the website.
