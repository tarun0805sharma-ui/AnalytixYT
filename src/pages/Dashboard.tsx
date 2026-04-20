import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  ArrowLeft, Download, RefreshCcw, Search, MessageSquare, ThumbsUp, AlertCircle, Zap, BarChart3, PieChart as PieChartIcon, LineChart, LogOut
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import * as xlsx from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Comment {
  id: string;
  author: string;
  authorProfileImageUrl: string;
  text: string;
  likeCount: number;
  publishedAt: string;
}

interface Analysis {
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  keywords: Array<{ word: string; count: number }>;
  complaints: string[];
  summary: string;
}

const COLORS = ['#10b981', '#f43f5e', '#64748b']; // Emerald, Rose, Slate for positive, negative, neutral

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const initialUrl = searchParams.get('url') || '';
  
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  
  const [videoTitle, setVideoTitle] = useState('YouTube_Video');
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const fetchComments = async (targetUrl: string) => {
    if (!targetUrl) return;
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/extract-comments', { url: targetUrl });
      setComments(response.data.comments || []);
      setAnalysis(response.data.analysis || null);
      if (response.data.videoTitle) {
        setVideoTitle(response.data.videoTitle);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to extract comments. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialUrl) {
      fetchComments(initialUrl);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchComments(url);
  };

  const getDownloadFilename = (extension: string) => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // safeTitle replaces non-alphanumerics with underscores and handles multiple underscores
    const safeTitle = videoTitle.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
    
    return `${safeTitle}_${day}-${month}-${year}_${hours}-${minutes}.${extension}`;
  };

  const downloadCSV = () => {
    if (comments.length === 0) return;
    
    const headers = ['Author', 'Likes', 'Date', 'Comment'];
    const csvContent = [
      headers.join(','),
      ...comments.map(c => 
        `"${c.author.replace(/"/g, '""')}","${c.likeCount}","${new Date(c.publishedAt).toLocaleDateString()}","${c.text.replace(/"/g, '""')}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = getDownloadFilename('csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadMenuOpen(false);
  };

  const downloadExcel = () => {
    if (comments.length === 0) return;
    const data = comments.map(c => ({
      Author: c.author,
      Likes: c.likeCount,
      Date: new Date(c.publishedAt).toLocaleDateString(),
      Comment: c.text
    }));
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Comments');
    xlsx.writeFile(workbook, getDownloadFilename('xlsx'));
    setDownloadMenuOpen(false);
  };

  const downloadPDF = () => {
    if (comments.length === 0) return;
    const doc = new jsPDF();
    doc.text('YouTube Comments Analysis', 14, 15);
    doc.text(`Video: ${videoTitle}`, 14, 25);
    
    const tableData = comments.map(c => [
      c.author,
      c.likeCount.toString(),
      new Date(c.publishedAt).toLocaleDateString(),
      c.text
    ]);

    autoTable(doc, {
      startY: 30,
      head: [['Author', 'Likes', 'Date', 'Comment']],
      body: tableData,
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 15 },
        2: { cellWidth: 20 },
        3: { cellWidth: 'auto' }
      }
    });

    doc.save(getDownloadFilename('pdf'));
    setDownloadMenuOpen(false);
  };

  const filteredComments = comments.filter(c => 
    c.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pieData = analysis?.sentiment ? [
    { name: 'Positive', value: analysis.sentiment.positive || 0 },
    { name: 'Negative', value: analysis.sentiment.negative || 0 },
    { name: 'Neutral', value: Math.max(0, 100 - (analysis.sentiment.positive || 0) - (analysis.sentiment.negative || 0)) },
  ] : [];

  return (
    <div className="font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Top Navbar */}
      <nav className="glass-panel border-b-0 border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <a href="/" className="font-bold text-lg hidden sm:flex items-center gap-1.5 group">
              <LineChart className="w-5 h-5 text-accent group-hover:scale-105 transition-transform" />
              <span className="text-white tracking-tight">Analytix<span className="text-accent">.yt</span></span>
            </a>
          </div>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="YouTube Video URL"
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl text-sm bg-slate-900/50 text-white placeholder-slate-400 focus:bg-slate-900/80 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary px-4 py-2 rounded-xl text-sm disabled:opacity-70 flex items-center gap-2"
            >
              {loading ? <RefreshCcw className="w-4 h-4 animate-spin text-[#0f172a]" /> : <span className="text-[#0f172a]">Analyze</span>}
            </button>
          </form>

          <div className="relative hidden md:flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                disabled={comments.length === 0}
                className="flex items-center gap-2 border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <AnimatePresence>
                {downloadMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col"
                  >
                    <button onClick={downloadCSV} className="text-left px-4 py-3 hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors border-b border-white/5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Download as CSV
                    </button>
                    <button onClick={downloadExcel} className="text-left px-4 py-3 hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors border-b border-white/5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Download as Excel (.xlsx)
                    </button>
                    <button onClick={downloadPDF} className="text-left px-4 py-3 hover:bg-white/5 text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Download as PDF
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={async () => await logout()} 
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
              title="Log out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {error && (
          <div className="mb-8 p-4 bg-red-900/30 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {!loading && comments.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 glass-panel rounded-2xl mx-auto max-w-2xl mt-12">
             <MessageSquare className="w-16 h-16 mb-4 text-slate-500 opacity-50" />
             <h2 className="text-xl font-medium text-white mb-2">No data yet</h2>
             <p className="text-slate-400">Enter a YouTube URL above to begin analysis.</p>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 animate-pulse font-medium">Extracting and analyzing comments via Gemini AI...</p>
          </div>
        )}

        {!loading && comments.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Analysis Dashboard */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Summary Card */}
              {analysis?.summary && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl"
                >
                  <h3 className="font-semibold text-lg mb-3 text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    AI Summary
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{analysis.summary}</p>
                </motion.div>
              )}

              {/* Sentiment Card */}
              {analysis?.sentiment && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl"
                >
                  <h3 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                    <PieChartIcon className="w-5 h-5 text-accent" />
                    Sentiment Analysis
                  </h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value: number) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4 text-sm">
                    {pieData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                        <span className="text-slate-400">{entry.name} ({entry.value}%)</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

               {/* Top Keywords Card */}
               {analysis && analysis.keywords && analysis.keywords.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl"
                >
                  <h3 className="font-semibold text-lg mb-6 text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent" />
                    Top Keywords
                  </h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analysis.keywords} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="word" type="category" width={80} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)' }} />
                        <Bar dataKey="count" fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={20}>
                          {analysis.keywords.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index < 3 ? 'var(--accent)' : 'rgba(255,255,255,0.1)'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              )}

              {/* Complaints Card */}
              {analysis && analysis.complaints && analysis.complaints.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-panel p-6 sm:p-8 rounded-2xl"
                >
                  <h3 className="font-semibold text-lg mb-4 text-white flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    Top Complaints
                  </h3>
                  <ul className="space-y-3">
                    {analysis.complaints.map((complaint, idx) => (
                       <li key={idx} className="flex gap-3 text-sm text-slate-300 bg-red-500/10 p-3.5 rounded-xl border border-red-500/20">
                          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{complaint}</span>
                       </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right Column: Comments Table */}
            <div className="lg:col-span-2">
              <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full max-h-[800px] border-white/10">
                <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-md">
                   <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                     <MessageSquare className="w-5 h-5 text-accent" />
                     Raw Comments ({comments.length})
                   </h3>
                   <div className="relative w-full sm:w-auto">
                     <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Filter comments..." 
                       value={searchTerm}
                       onChange={e => setSearchTerm(e.target.value)}
                       className="w-full sm:w-auto pl-9 pr-4 py-2 text-sm border border-white/10 rounded-xl outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-slate-900/50 text-white placeholder-slate-400 min-w-[240px] transition-all"
                     />
                   </div>
                </div>
                
                <div className="overflow-y-auto flex-1 p-0 custom-scrollbar">
                   <div className="divide-y divide-white/5">
                     <AnimatePresence>
                        {filteredComments.map((comment) => (
                          <motion.div 
                            key={comment.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-5 sm:p-6 hover:bg-white/5 transition-colors group"
                          >
                            <div className="flex gap-4">
                              <img src={comment.authorProfileImageUrl} alt={comment.author} className="w-10 h-10 rounded-full bg-slate-800 shrink-0 border border-white/10 group-hover:border-accent/30 transition-colors" />
                              <div className="flex-1 min-w-0 pt-0.5">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="font-semibold text-sm text-white/90 truncate">{comment.author}</span>
                                  <span className="text-xs text-slate-400">{new Date(comment.publishedAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-slate-300 whitespace-pre-wrap break-words leading-relaxed">{comment.text}</p>
                                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                  {comment.likeCount || 0}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                     </AnimatePresence>
                     {filteredComments.length === 0 && (
                       <div className="p-12 text-center text-slate-400 text-sm">
                         No comments match your filter.
                       </div>
                     )}
                   </div>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}
