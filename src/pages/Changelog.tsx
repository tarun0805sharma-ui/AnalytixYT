import React from 'react';
import { ArrowLeft, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const changelog = [
  {
    version: 'v2.1.0',
    date: 'April 20, 2026',
    changes: [
      { type: 'feature', bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Feature', description: 'Added proper Authentication with Google, GitHub, and Email/Password.' },
      { type: 'improvement', bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Improvement', description: 'Complete UI overhaul for the Landing Page and Dashboard navigation.' },
      { type: 'fix', bg: 'bg-rose-500/20', text: 'text-rose-400', label: 'Fix', description: 'Fixed an issue where file exports were incorrectly named "Mock_Video_Tutorial".' }
    ]
  },
  {
    version: 'v2.0.0',
    date: 'March 15, 2026',
    changes: [
      { type: 'feature', bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Feature', description: 'Integrated Google Gemini AI for advanced sentiment analysis and keyword extraction.' },
      { type: 'feature', bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Feature', description: 'Launched the new Agency tier with API access.' }
    ]
  },
  {
    version: 'v1.5.2',
    date: 'February 2, 2026',
    changes: [
      { type: 'improvement', bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Improvement', description: 'Optimized comment extraction speed by 40% for videos with over 5,000 comments.' },
      { type: 'fix', bg: 'bg-rose-500/20', text: 'text-rose-400', label: 'Fix', description: 'Fixed PDF export table formatting on mobile devices.' }
    ]
  }
];

export default function Changelog() {
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

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-4">Changelog</h1>
        <p className="text-slate-400 mb-16 text-lg">New updates and improvements to Analytix.yt.</p>

        <div className="space-y-16">
          {changelog.map((release) => (
            <div key={release.version} className="relative pl-8 md:pl-0">
              <div className="md:grid md:grid-cols-4 md:gap-8">
                <div className="mb-4 md:mb-0 md:text-right pt-1">
                  <h2 className="text-xl font-bold text-white mb-1">{release.version}</h2>
                  <p className="text-sm text-slate-500">{release.date}</p>
                </div>
                
                <div className="md:col-span-3 space-y-4">
                  {release.changes.map((change, i) => (
                    <div key={i} className="flex items-start gap-4 glass-panel p-4 rounded-2xl">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap mt-0.5 ${change.bg} ${change.text}`}>
                        {change.label}
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed pt-0.5">
                        {change.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
