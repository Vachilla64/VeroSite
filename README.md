# Vero Developer Portal & B2B Dashboard

This repository contains **VeroSite**, the B2B developer portal and dashboard for the Vero Trust Network.

Vero is an integrable API that intercepts Nigerian bank transfers to provide a 0 to 100 Trust Score and an AI-driven risk explanation before money is sent. This portal allows enterprise customers and developers to integrate Vero into their own platforms.

## ✨ Features
- **API Key Management**: Secure generation and rolling of `x-api-key` credentials for server-to-server integration. Backed by the live `/api/developer/keys` endpoints.
- **Interactive Documentation**: Guides and copy-pasteable cURL examples for the Vero auth, verify, report and history endpoints.
- **Premium UI**: Built with a focus on trust and reliability, using zero-trust architectural themes and a sleek design language.

> **Not yet implemented.** The Webhooks documentation page and the webhook delivery table on the dashboard are
> **UI placeholders for a planned feature**. The Vero backend implements no webhook system — there is no webhook
> route, no delivery mechanism, and no webhook model in the schema. The API usage chart on the dashboard is
> likewise sample data; no usage-reporting endpoint exists. Both are labelled as such in the UI.

## 🏗 Stack
- React + Vite
- TypeScript
- Tailwind CSS
- Lucide React (Icons)
- React Router DOM

## 🚀 Local Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm run dev
   ```

3. **Backend Connection:**

   The dashboard reads its backend host from `VITE_API_URL`, falling back to `http://localhost:8080` when unset.

   - **Against the live backend** (no local backend needed) — create a `.env` file in the repo root:
     ```
     VITE_API_URL=https://api-vero.up.railway.app
     ```
   - **Against a local backend** — leave `VITE_API_URL` unset and run the `Vero` backend repo on port `8080`.

   > ⚠️ **Vite inlines env vars at build time, not runtime.** Changing `VITE_API_URL` has no effect on an already-built
   > bundle — you must restart `npm run dev` locally, and rebuild + redeploy for production. Setting the variable in a
   > hosting provider's dashboard after the fact does nothing until the next deploy.

## 🌐 Live API

Base URL: `https://api-vero.up.railway.app`

Seeded demo credentials for exploring the dashboard and docs examples: `clean@vero.net` / `password123`.

Health check:
```bash
curl https://api-vero.up.railway.app/health
```

## 🔑 Authentication
The Developer Portal uses dual authentication:
1. **User Login**: Standard users log in with their email/password (JWT) via the main Vero backend.
2. **API Keys**: Once logged in, developers can generate an `x-api-key` which is used for all backend integration requests, ensuring a secure server-to-server connection.
