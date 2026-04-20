import React from 'react';
import { ArrowLeft, LineChart, MessageCircle, Github, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Community() {
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

      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Join the Community</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-16">Connect with other creators, developers, and data nerds. Share scripts, request features, and learn how others are using Analytix.yt.</p>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <a href="#" className="glass-panel p-8 rounded-3xl hover:border-[#5865F2]/50 transition-colors group text-left">
            <div className="w-12 h-12 bg-[#5865F2]/10 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6 text-[#5865F2]" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#5865F2] transition-colors">Discord Server</h3>
            <p className="text-slate-400 text-sm">Join our active Discord to chat live with the founders and get community support.</p>
          </a>

          <a href="#" className="glass-panel p-8 rounded-3xl hover:border-white/50 transition-colors group text-left">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors">GitHub Discussions</h3>
            <p className="text-slate-400 text-sm">Request features, report bugs, and view open source examples of using our API.</p>
          </a>
        </div>
      </main>
    </div>
  );
}
