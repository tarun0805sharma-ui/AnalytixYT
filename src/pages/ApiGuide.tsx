import React from 'react';
import { ArrowLeft, LineChart, Code2, Copy, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApiGuide() {
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
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-accent/10 rounded-xl">
            <Code2 className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-white">API Overview</h1>
        </div>
        <p className="text-slate-400 mb-8 text-lg">Integrate Analytix.yt directly into your own applications using our strict REST API.</p>

        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Authentication</h2>
            <p>All API requests require a Bearer token in the Authorization header. You can generate an API key from your Dashboard settings after upgrading to the Agency tier.</p>
            <div className="bg-slate-900 rounded-xl p-4 border border-white/10 my-4 font-mono text-sm">
              <span className="text-slate-500">Authorization:</span> Bearer YOUR_API_KEY
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">GET</span>
              /api/v1/analyze
            </h2>
            <p>Initiates a background extraction and sentiment analysis for a given YouTube video URL.</p>
            
            <h3 className="text-lg font-medium text-white mt-6 mb-2">Parameters</h3>
            <div className="bg-slate-900 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-4 py-3 text-slate-300 font-medium">Name</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">Type</th>
                    <th className="px-4 py-3 text-slate-300 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-4 py-3 text-accent font-mono">url</td>
                    <td className="px-4 py-3 text-slate-400">string</td>
                    <td className="px-4 py-3">The full YouTube video URL. (Required)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-accent font-mono">maxComments</td>
                    <td className="px-4 py-3 text-slate-400">integer</td>
                    <td className="px-4 py-3">Limit the number of comments to extract (Max 10,000).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-white mt-6 mb-2">Response Example</h3>
            <div className="bg-slate-900 rounded-xl p-4 border border-white/10 my-4 font-mono text-sm relative group text-emerald-400">
              {`{
  "id": "job_123abc",
  "status": "completed",
  "videoTitle": "React Basics 2026",
  "totalAnalyzed": 542,
  "sentiment": {
    "positive": 85,
    "negative": 5
  },
  "keywords": ["awesome", "helpful", "audio issue"]
}`}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Rate Limits</h2>
            <p>To prevent abuse, the API enforces the following rate limits based on your subscription tier:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Pro:</strong> 10 requests per minute.</li>
              <li><strong>Agency:</strong> 100 requests per minute (Custom limits available).</li>
            </ul>
            <p className="mt-4 text-sm text-slate-400">If you exceed the rate limit, the API will return a 429 Too Many Requests response.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
