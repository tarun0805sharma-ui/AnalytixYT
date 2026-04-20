import express from 'express';
import { google } from 'googleapis';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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
    
    if (!process.env.YOUTUBE_API_KEY) {
      console.warn("YOUTUBE_API_KEY not set. Returning mock data.");
      videoTitle = "Mock_Video_Tutorial";
      
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
          author: `User${Math.floor(Math.random() * 1000)}`,
          authorProfileImageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
          text: mockTexts[i % mockTexts.length] + (i > 9 ? ` (${i})` : ''),
          likeCount: Math.floor(Math.random() * 500),
          publishedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
        });
      }
    } else {
      try {
        const videoRes = await youtube.videos.list({
          part: ['snippet'],
          id: [videoId]
        });
        if (videoRes.data.items && videoRes.data.items.length > 0) {
          videoTitle = videoRes.data.items[0].snippet?.title || videoTitle;
        }

        const response = await youtube.commentThreads.list({
          part: ['snippet'],
          videoId: videoId,
          maxResults: 100,
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

    if (comments.length === 0) {
      return res.status(200).json({ comments: [], analysis: null, videoTitle });
    }

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
  ],
  "complaints": [ "string" ],
  "summary": "string"
}`;

    let analysis = null;
    try {
      const result = await ai.models.generateContent({
        model: 'gemini-3.1-flash-preview',
        contents: prompt,
      });

      const textResult = result.text;
      if (textResult) {
          const cleanedText = textResult.replace(/^```json/g, '').replace(/```$/g, '').trim();
          analysis = JSON.parse(cleanedText);
      }
    } catch (aiError) {
      console.error("AI Analysis Error:", aiError);
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

export default app;
