import React from 'react';
import { ArrowLeft, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const posts = [
  {
    id: 1,
    title: 'The Hidden Goldmine in YouTube Comments',
    excerpt: 'Stop ignoring your comments section. Learn how top creators use sentiment analysis to guide their content strategy.',
    date: 'April 15, 2026',
    category: 'Creator Strategy',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Introducing Analytix.yt Pro: Export to Excel',
    excerpt: 'Today we are excited to launch our highly requested Excel export feature, along with massive performance upgrades.',
    date: 'March 22, 2026',
    category: 'Product Update',
    readTime: '3 min read'
  },
  {
    id: 3,
    title: 'How to handle negative comments as a brand',
    excerpt: 'Negative comments happen. But they are also your best source of raw product feedback if analyzed correctly.',
    date: 'February 10, 2026',
    category: 'Marketing',
    readTime: '7 min read'
  }
];

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] font-sans text-slate-300">
      <nav className="border-b border-white/10 bg-slate-900/50 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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

      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">The Analytix Blog</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Insights, strategies, and product updates from the team building the best comment analysis tool on the internet.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="glass-panel p-6 rounded-3xl hover:border-accent/50 transition-colors cursor-pointer group flex flex-col h-full">
              <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-4">
                <span className="text-accent">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="pt-4 border-t border-white/10 text-sm text-slate-500 mt-auto">
                {post.date}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
