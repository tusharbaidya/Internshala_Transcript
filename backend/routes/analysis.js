import express from 'express';
import Analysis from '../models/Analysis.js';
import { callOllama, parseStructuredOutput, MODEL } from '../utils/ollama.js';
import { buildAnalysisPrompt } from '../utils/prompts.js';

const router = express.Router();

router.post('/run', async (req, res) => {
  const { transcript } = req.body;

  if (!transcript || transcript.trim().length < 50) {
    return res.status(400).json({ error: 'Transcript is too short. Please paste the full supervisor transcript.' });
  }

  const startTime = Date.now();

  try {
    const prompt = buildAnalysisPrompt(transcript);

    let parsed;
    let lastError;
    // Retry up to 2 times on parse failure
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const raw = await callOllama(prompt);
        parsed = parseStructuredOutput(raw);
        break;
      } catch (err) {
        lastError = err;
        console.warn(`Attempt ${attempt} failed:`, err.message);
      }
    }

    if (!parsed) {
      return res.status(500).json({ error: `LLM output parsing failed: ${lastError?.message}` });
    }

    // Validate and normalize
    const result = {
      extractedEvidence: Array.isArray(parsed.extractedEvidence) ? parsed.extractedEvidence : [],
      rubricScore: parsed.rubricScore || { score: null, justification: 'Could not determine score.' },
      kpiMapping: Array.isArray(parsed.kpiMapping) ? parsed.kpiMapping : [],
      gapAnalysis: Array.isArray(parsed.gapAnalysis) ? parsed.gapAnalysis : [],
      followUpQuestions: Array.isArray(parsed.followUpQuestions) ? parsed.followUpQuestions : [],
      modelUsed: MODEL,
      processingTimeMs: Date.now() - startTime,
    };

    // Save to MongoDB (non-blocking — don't fail request if DB is down)
    try {
      const doc = new Analysis({ transcript, ...result });
      await doc.save();
      result.id = doc._id;
    } catch (dbErr) {
      console.warn('DB save skipped:', dbErr.message);
    }

    return res.json(result);
  } catch (err) {
    console.error('Analysis error:', err);
    if (err.message.includes('fetch') || err.message.includes('ECONNREFUSED')) {
      return res.status(503).json({
        error: 'Cannot connect to Ollama. Make sure Ollama is running: run "ollama serve" in a terminal.',
      });
    }
    return res.status(500).json({ error: err.message });
  }
});

export default router;
