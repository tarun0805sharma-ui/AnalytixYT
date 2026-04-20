import React from 'react';
import { ArrowLeft, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans text-slate-300">
      <nav className="border-b border-white/10 bg-slate-900/50 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <a href="/" className="flex items-center gap-2 group">
            <LineChart className="w-5 h-5 text-accent group-hover:scale-105 transition-transform" />
            <span className="text-xl font-black tracking-tight text-white flex items-center">
              Analytix<span className="text-accent">.yt</span>
            </span>
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last updated: April 2026</p>

        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using Analytix.yt, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
            <p>Our service allows you to extract and analyze YouTube comments. You agree to use this service only for lawful purposes and in accordance with:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>These Terms of Service</li>
              <li>YouTube's Terms of Service</li>
              <li>Google's Privacy Policy</li>
              <li>All applicable local, state, national, and international laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Accounts and Subscriptions</h2>
            <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            <p className="mt-4">You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. API Usage and Rate Limits</h2>
            <p>Users on the Free and Pro tiers are subject to rate limiting to ensure fair usage and platform stability. Abuse of our APIs or web scraping of our endpoints without written permission is strictly prohibited and will result in a permanent ban.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Disclaimer</h2>
            <p>Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Analytix.yt expressly disclaims all warranties of any kind, whether express or implied.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
