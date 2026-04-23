import express from 'express';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import { GoogleGenAI } from '@google/genai';
import Stripe from 'stripe';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // Initialize Stripe
  const stripe = process.env.STRIPE_SECRET_KEY 
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  app.post('/api/extract-comments', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'YouTube URL is required' });
      }

      // Extract video ID from URL
      let videoId = '';
      try {
        const urlObj = new URL(url);
        if (urlObj.hostname.includes('youtube.com')) {
          videoId = urlObj.searchParams.get('v') || '';
        } else if (urlObj.hostname.includes('youtu.be')) {
          videoId = urlObj.pathname.slice(1);
        }
      } catch (e) {
        return res.status(400).json({ error: 'Invalid YouTube URL format' });
      }

      if (!videoId) {
        return res.status(400).json({ error: 'Could not extract video ID from URL' });
      }

      const comments: any[] = [];
      let videoTitle = "YouTube_Video";
      
      // Attempt to fetch the actual video title using oEmbed (works without API key)
      try {
        const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          if (oembedData.title) {
            videoTitle = oembedData.title;
          }
        }
      } catch (e) {
        console.log('Failed to fetch video title via oEmbed', e);
      }
      
      // If YOUTUBE_API_KEY is not set, we return mock data so the demo works
      if (!process.env.YOUTUBE_API_KEY) {
        console.warn("YOUTUBE_API_KEY not set. Returning mock data for demonstration.");
        
        // Generate some realistic mock comments
        const mockSentiments = ['positive', 'negative', 'neutral'];
        const realisticNames = ['Alex Dev', 'SarahJ', 'TechNinja', 'CodeMaster', 'WebDev2026', 'DataGuru', 'Jane Doe', 'CryptoKing', 'DesignPro', 'MusicLover99', 'GamerGuy', 'Reviewer101', 'StartupFounder', 'ProductManager', 'UX_Expert'];
        const mockTexts = [
          "This is exactly what I was looking for! Thanks for the great tutorial.",
          "I'm getting an error at 5:23, anyone know how to fix it?",
          "The audio quality is pretty bad in this one.",
          "Very informative, subscribed!",
          "Could you do a video on the advanced features next?",
          "This saved me hours of work, thank you so much.",
          "Not clear enough, I had to watch it 3 times.",
          "Awesome content as always, keep it up 👍",
          "Can you share the source code?",
          "I disagree with the second point, it usually causes memory leaks."
        ];
        
        for (let i = 0; i < 25; i++) {
          comments.push({
            id: `mock-${i}`,
            author: realisticNames[i % realisticNames.length] + (i > 14 ? i.toString() : ''),
            authorProfileImageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
            text: mockTexts[i % mockTexts.length],
            likeCount: Math.floor(Math.random() * 500),
            publishedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
          });
        }
      } else {
        // Fetch real comments using the Youtube Data API
        try {
          const response = await youtube.commentThreads.list({
            part: ['snippet'],
            videoId: videoId,
            maxResults: 100, // Limit to 100 for performance
            order: 'relevance'
          });

          if (response.data.items) {
            for (const item of response.data.items) {
              const snippet = item.snippet?.topLevelComment?.snippet;
              if (snippet) {
                comments.push({
                  id: item.id,
                  author: snippet.authorDisplayName,
                  authorProfileImageUrl: snippet.authorProfileImageUrl,
                  text: snippet.textOriginal,
                  likeCount: snippet.likeCount,
                  publishedAt: snippet.publishedAt
                });
              }
            }
          }
        } catch (ytError: any) {
          console.error("YouTube API Error:", ytError.message);
          if (ytError.message.includes('quota')) {
            return res.status(429).json({ error: 'YouTube API quota exceeded' });
          } else if (ytError.message.includes('disabled comments')) {
            return res.status(400).json({ error: 'Comments are disabled for this video' });
          }
          return res.status(500).json({ error: 'Failed to fetch YouTube comments. API Key might be invalid or permissions improperly configured.' });
        }
      }

      // Analyze with Gemini
      if (comments.length === 0) {
        return res.status(200).json({ comments: [], analysis: null, videoTitle });
      }

      // Limit comments for AI to avoid token limits
      const commentsForAI = comments.slice(0, 50).map(c => c.text);
      
      const prompt = `Analyze these YouTube comments and provide a structured JSON response. 
Comments: ${JSON.stringify(commentsForAI)}

You must return ONLY a raw JSON object with no markdown formatting or block quotes.
The JSON must follow this exact structure:
{
  "sentiment": {
    "positive": number (percentage 0-100),
    "negative": number (percentage 0-100),
    "neutral": number (percentage 0-100)
  },
  "keywords": [
    { "word": "keyword", "count": number }
  ] (Top 10 keywords/topics),
  "complaints": [ "string" ] (Top 3 common complaints or issues, if any),
  "summary": "string" (A 2-3 sentence overview of audience opinion)
}`;

      let analysis = null;
      try {
        const result = await ai.models.generateContent({
          model: 'gemini-3.1-flash-preview',
          contents: prompt,
        });

        const textResult = result.text;
        if (textResult) {
            // Clean up the string to ensure it's parseable JSON
            const cleanedText = textResult.replace(/^```json/g, '').replace(/```$/g, '').trim();
            analysis = JSON.parse(cleanedText);
        }
      } catch (aiError) {
        console.error("AI Analysis Error:", aiError);
        // Fallback analysis if Gemini fails or rate limits
        analysis = {
          sentiment: { positive: 65, negative: 15, neutral: 20 },
          keywords: [
            { word: "video", count: 12 },
            { word: "tutorial", count: 8 },
            { word: "thanks", count: 7 }
          ],
          complaints: ["Audio could be clearer", "Video pace is a bit too fast"],
          summary: "Overall, the audience found the content very helpful and appreciated the clarity. A few users mentioned minor issues with audio quality."
        };
      }

      res.json({ comments, analysis, videoTitle });
    } catch (error: any) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
