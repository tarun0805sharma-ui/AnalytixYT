import React from 'react';
import { ArrowLeft, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CookiePolicy() {
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
        <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
        <p className="text-slate-400 mb-8">Last updated: April 2026</p>

        <div className="space-y-8 prose prose-invert max-w-none">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. What are cookies?</h2>
            <p>Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How Analytix.yt uses cookies</h2>
            <p>When you use and access the Service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Essential cookies:</strong> To authenticate users and prevent fraudulent use of user accounts. We use these cookies to remember your login status.</li>
              <li><strong>Analytics cookies:</strong> To track information how the Service is used so that we can make improvements. We may also use analytics cookies to test new pages, features or new functionality of the Service to see how our users react to them.</li>
              <li><strong>Preferences cookies:</strong> To remember information that changes the way the Service behaves or looks, such as your "remember me" functionality.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Third-party cookies</h2>
            <p>In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service and provide authentication (e.g., Firebase Authentication, Google Firebase, GitHub Auth).</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. What are your choices regarding cookies</h2>
            <p>If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.</p>
            <p className="mt-2 text-slate-400 text-sm">Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
