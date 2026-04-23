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
  ChevronRight,
  LineChart,
  Activity,
  Github,
  Twitter,
  Linkedin,
  PlayCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
        <a href="/" className="flex items-center gap-2 group">
          <LineChart className="w-7 h-7 text-accent group-hover:scale-105 transition-transform" />
          <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
            Analytix<span className="text-accent">.yt</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <button onClick={async () => await logout()} className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors">Log out</button>
              <button onClick={() => navigate('/dashboard')} className="btn-primary px-5 py-2.5 rounded-full transition-all flex items-center gap-2">
                Go to Dashboard <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/auth')} className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors">Log in</button>
              <button onClick={() => navigate('/signup')} className="btn-primary px-5 py-2.5 rounded-full transition-all flex items-center gap-2">
                Sign up <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
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
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-400 font-medium pb-12">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> No credit card required</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-accent" /> Free 100 comments/mo</span>
        </div>
        
        {/* Trusted By Banner */}
        <div className="pt-12 border-t border-white/5">
          <p className="text-sm font-medium text-slate-500 mb-6 uppercase tracking-widest">Trusted by creators & analysts at</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 select-none"><div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"><PlayCircle className="w-5 h-5 text-white" /></div><span className="text-xl font-bold text-white">MediaTech</span></div>
            <div className="flex items-center gap-2 select-none"><div className="w-8 h-8 rounded bg-blue-500 text-white font-bold flex items-center justify-center">S</div><span className="text-xl font-bold text-white">SocialScale</span></div>
            <div className="flex items-center gap-2 select-none"><div className="w-8 h-8 rounded-full border-2 border-indigo-500 flex items-center justify-center"><Activity className="w-4 h-4 text-indigo-500" /></div><span className="text-xl font-bold text-white">DataStream</span></div>
            <div className="flex items-center gap-2 select-none"><div className="w-8 h-8 rotate-45 bg-emerald-500 flex items-center justify-center"></div><span className="text-xl font-bold text-white">ViralSense</span></div>
          </div>
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

      {/* How it Works Section */}
      <section className="py-24 bg-slate-900/50 border-y border-white/5" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How it works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Three simple steps to unlock the true value of your YouTube comments.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 hidden md:block" />
            
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6 relative z-10 shadow-xl shadow-black/50">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Copy URL</h3>
              <p className="text-slate-400">Grab the link of any public YouTube video you want to analyze.</p>
            </div>
            
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-6 relative z-10 shadow-xl shadow-black/50">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Processing</h3>
              <p className="text-slate-400">Our engine extracts all comments and runs them through Google Gemini.</p>
            </div>
            
            <div className="relative text-center">
              <div className="w-20 h-20 mx-auto bg-accent border-4 border-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-[#0f172a] mb-6 relative z-10 shadow-xl shadow-accent/20">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Export Data</h3>
              <p className="text-slate-400">Review sentiments, keywords, and export to CSV, Excel, or PDF seamlessly.</p>
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
              <button onClick={() => navigate('/dashboard')} className="w-full py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors text-white">Get Started Free</button>
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
              <button onClick={() => navigate('/dashboard')} className="w-full py-3 rounded-xl font-medium btn-primary shadow-md">Upgrade to Pro</button>
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
              <button onClick={() => window.location.href = 'mailto:hello@analytix.yt'} className="w-full py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-colors text-white">Contact Sales</button>
            </div>
          </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-16 mt-12 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <a href="/" className="flex items-center gap-2 mb-4">
                <LineChart className="w-6 h-6 text-accent" />
                <span className="text-xl font-bold tracking-tight text-white">Analytix<span className="text-accent">.yt</span></span>
              </a>
              <p className="text-slate-400 text-sm mb-6 max-w-xs">
                The ultimate AI-powered comment analysis engine for creators and marketers. Turn unstructured feedback into clear strategy.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-slate-400 hover:text-accent text-sm transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-slate-400 hover:text-accent text-sm transition-colors">How it works</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-accent text-sm transition-colors">Pricing</a></li>
                <li><a href="/changelog" className="text-slate-400 hover:text-accent text-sm transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="https://github.com/analytix" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-accent text-sm transition-colors">Documentation</a></li>
                <li><a href="/api-guide" className="text-slate-400 hover:text-accent text-sm transition-colors">API Guide</a></li>
                <li><a href="/blog" className="text-slate-400 hover:text-accent text-sm transition-colors">Blog</a></li>
                <li><a href="/community" className="text-slate-400 hover:text-accent text-sm transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-slate-400 hover:text-accent text-sm transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-slate-400 hover:text-accent text-sm transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="text-slate-400 hover:text-accent text-sm transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2026 Analytix.yt. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
