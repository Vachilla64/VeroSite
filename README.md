# Vero Developer Portal & B2B Dashboard

This repository contains **VeroSite**, the B2B developer portal and dashboard for the Vero Trust Network.

Vero is an integrable API that intercepts Nigerian bank transfers to provide a 0 to 100 Trust Score and an AI-driven risk explanation before money is sent. This portal allows enterprise customers and developers to integrate Vero into their own platforms.

## ✨ Features
- **API Key Management**: Secure generation and rolling of `x-api-key` credentials for server-to-server integration.
- **Webhook Dashboard**: Real-time mock dashboard for monitoring webhook deliveries (e.g., `score.calculated`, `account.flagged`).
- **Interactive Documentation**: Comprehensive guides and cURL examples for implementing the Vero `Lookup API` and Auth flows.
- **Premium UI**: Built with a focus on trust and reliability, using zero-trust architectural themes and a sleek design language.

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
   This frontend expects the main Vero backend to be running on `http://localhost:8080`. Ensure you have the `Vero` repository cloned and the backend server started.

## 🔑 Authentication
The Developer Portal uses dual authentication:
1. **User Login**: Standard users log in with their email/password (JWT) via the main Vero backend.
2. **API Keys**: Once logged in, developers can generate an `x-api-key` which is used for all backend integration requests, ensuring a secure server-to-server connection.
