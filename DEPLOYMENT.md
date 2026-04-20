# Deployment Guide

This repository contains a full-stack SaaS application configured for an Express + Vite architecture. The backend uses Express and the `googleapis` package to securely fetch YouTube metadata. The AI processing is done using the `@google/genai` library via Gemini 2.5 Flash on the backend, ensuring API keys are not exposed to the client.

## Tech Stack Overview
- **Frontend**: React + Vite + Tailwind CSS + Framer Motion + Recharts
- **Backend**: Node.js + Express
- **AI Processing**: Gemini 2.5 Flash API
- **Data Scraping Fetching**: YouTube Data API v3

## Prerequisites
1. **Gemini API Key**: Available from Google AI Studio.
2. **YouTube Data API Key**: Turn on the API in Google Cloud Console.

## Environment Variables
Ensure you have an `.env` file (or set these in your deployment platform's environment settings):
\`\`\`env
# Required for Gemini AI API calls
GEMINI_API_KEY="your_gemini_api_key"

# YouTube Data API Key for fetching comments
YOUTUBE_API_KEY="your_youtube_api_key_here"

# (Optional) Stripe keys for payments
STRIPE_SECRET_KEY=""
VITE_STRIPE_PUBLIC_KEY=""
\`\`\`

## Deployment Options

### Vercel / Render / Railway (Monorepo Node App Deployment)
This project is configured to run as a **single port Node.js application**. 

**General Node.js PAAS Steps (Render / Railway / Heroku)**
1. Connect your GitHub repository to your platform.
2. Set the Environment Variables.
3. **Build Command**: \`npm run build\`
4. **Start Command**: \`npm start\`

When you run \`npm run build\`, the frontend builds to \`/dist\`, and \`esbuild\` compiles \`server.ts\` to \`/dist/server.cjs\`.
When you run \`npm start\`, it starts \`node dist/server.cjs\` which both handles the \`/api/extract-comments\` logic AND serves the static compiled frontend files.

## Local Development
1. Install dependencies: \`npm install\`
2. Start development server (supports middleware mode proxy): \`npm run dev\`
3. Open browser to \`http://localhost:3000\`
