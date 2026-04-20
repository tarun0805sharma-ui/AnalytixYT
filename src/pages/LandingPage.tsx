import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Youtube, 
  BarChart3, 
  MessageSquare, 
  Download, 
  Zap, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsLoading(true);
    // Simulate slight delay for effect, then navigate
    setTimeout(() => {
      navigate(`/dashboard?url=${encodeURIComponent(url)}`);
    }, 800);
  };

  return (
    <div className="font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-[#38bdf8] p-2 rounded-xl">
            <Youtube className="w-6 h-6 text-[#0f172a]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Analytix.yt</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white">Log in</button>
          <button className="btn-primary px-5 py-2.5 rounded-full transition-all">
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 text-accent text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Gemini AI Analysis Engine 2.0 Live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 max-w-4xl mx-auto leading-tight">
            Extract & Analyze YouTube Comments in <span className="text-accent">Seconds</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Get instant insights, sentiment analysis, and top keywords from any video. Export data seamlessly. Turn feedback into strategy.
          </p>

          <form onSubmit={handleAnalyze} className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-accent rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative flex flex-col sm:flex-row items-center glass-panel heavy p-2 rounded-2xl w-full">
              <Youtube className="w-6 h-6 text-slate-400 ml-4 hidden sm:block" />
              <input 
                type="url" 
                required
                placeholder="Paste YouTube Video URL here..." 
                className="w-full px-4 py-3 outline-none text-white bg-transparent placeholder-slate-400 text-lg flex-1"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto btn-primary px-8 py-3.5 rounded-xl whitespace-nowrap flex items-center justify-center gap-2 disabled:opacity-70 mt-2 sm:mt-0"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Analyzing...
                  </span>
                ) : (
                  <>Analyze Now <ChevronRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </form>
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> No credit card required</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> Free 100 comments/mo</span>
        </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="py-24" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything you need to understand your audience</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Stop reading thousands of comments. Let AI do the heavy lifting for you in seconds.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-3xl">
              <div className="w-12 h-12 bg-[#38bdf8]/10 text-accent rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-3">Bulk Extraction</h3>
              <p className="text-slate-400 leading-relaxed">
                Extract up to 10,000 comments per video instantly. Includes usernames, timestamps, likes, and replies.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-3xl">
              <div className="w-12 h-12 bg-[#38bdf8]/10 text-accent rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-3">AI Sentiment Analysis</h3>
              <p className="text-slate-400 leading-relaxed">
                Powered by Gemini AI. Instantly know the ratio of positive to negative feedback and common complaints.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-3xl">
              <div className="w-12 h-12 bg-[#38bdf8]/10 text-accent rounded-2xl flex items-center justify-center mb-6">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-3">1-Click Export</h3>
              <p className="text-slate-400 leading-relaxed">
                Download your data exactly how you need it. Supported formats include CSV, Excel, and JSON.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="pricing">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-semibold mb-2 text-white">Hobby</h3>
              <div className="text-4xl font-bold mb-6 text-white">$0<span className="text-lg text-slate-400 font-medium tracking-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> 100 comments / video</li>
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> Basic sentiment analysis</li>
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> CSV Export</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors text-white">Get Started</button>
            </div>
            
            {/* Pro Tier */}
            <div className="glass-panel-heavy p-8 rounded-3xl relative scale-105 z-10" style={{ borderColor: 'var(--accent)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-[#0f172a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Pro</h3>
              <div className="text-4xl font-bold mb-6 text-white">$29<span className="text-lg text-slate-400 font-medium tracking-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> 10,000 comments / video</li>
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Advanced AI Insights</li>
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> JSON, CSV, Excel Export</li>
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Priority Support</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-medium btn-primary shadow-md">Upgrade to Pro</button>
            </div>

            {/* Agency Tier */}
            <div className="glass-panel p-8 rounded-3xl">
              <h3 className="text-xl font-semibold mb-2 text-white">Agency</h3>
              <div className="text-4xl font-bold mb-6 text-white">$99<span className="text-lg text-slate-400 font-medium tracking-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> Unlimited comments</li>
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> Custom API Access</li>
                <li className="flex gap-3 text-slate-300"><CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" /> White-label reports</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors text-white">Contact Sales</button>
            </div>
          </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-12 md:py-16 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-2">
            <Youtube className="w-5 h-5 text-slate-400" />
            <span className="text-lg font-bold tracking-tight text-slate-400">Analytix.yt</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Analytix.yt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
