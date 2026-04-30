import { useState } from "react";
import { Loader2, Play, FileText, ChevronDown } from "lucide-react";
import { runAnalysis } from "../utils/api.js";
import { SAMPLE_TRANSCRIPTS } from "../utils/samples.js";
import AnalysisResult from "../components/AnalysisResult.jsx";

export default function AnalyzePage() {
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showSamples, setShowSamples] = useState(false);

  const handleRun = async () => {
    if (!transcript.trim() || transcript.trim().length < 50) {
      setError(
        "Please paste a supervisor transcript (at least 50 characters).",
      );
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const { data } = await runAnalysis(transcript);
      setResult(data);
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Is Ollama running?",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sample) => {
    setTranscript(sample.text);
    setResult(null);
    setError("");
    setShowSamples(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Left: Input */}
      <div className="space-y-4">
        <div>
          <h1 className="font-display text-3xl text-ink-900">
            Supervisor Transcript Analyzer
          </h1>
          <p className="text-ink-500 mt-1 text-sm">
            Paste a supervisor interview transcript below. The AI will extract
            evidence, score the Fellow, and surface gaps.
          </p>
        </div>

        {/* Sample transcripts */}
        <div className="relative">
          <button
            onClick={() => setShowSamples(!showSamples)}
            className="flex items-center gap-2 text-sm text-ink-600 hover:text-ink-             900 border border-ink-200 bg-white rounded-lg px-3 py-2 transition-   colors"
          >
            <FileText className="w-3.5 h-3.5" />
            Load sample transcript
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showSamples ? "rotate-180" : ""}`}
            />
          </button>

          {showSamples && (
            <div className="absolute top-full mt-1 left-0 z-10 bg-white border border-ink-200 rounded-xl shadow-lg p-2 w-64 animate-slide-up">
              {SAMPLE_TRANSCRIPTS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => loadSample(s)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-ink-50 rounded-lg text-ink-700 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste the supervisor transcript here...

Example:
Interviewer: How has the Fellow been doing?
Supervisor: She's been exceptional — takes initiative, communicates clearly..."
            className="w-full h-80 lg:h-[500px] p-4 text-sm font-mono bg-white border border-ink-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-ink-900/20 focus:border-ink-400 text-ink-800 placeholder:text-ink-300 transition-colors"
          />
          <div className="absolute bottom-3 right-3 text-xs text-ink-300 font-mono">
            {transcript.length} chars
          </div>
        </div>

        {error && (
          <div className="bg-clay-400/10 border border-clay-400/30 text-clay-600 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleRun}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-ink-900 hover:bg-ink-800 disabled:bg-ink-300 text-white rounded-xl px-6 py-3.5 font-medium transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing… this may take 20–60 seconds
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Analysis
            </>
          )}
        </button>

        {loading && (
          <div className="text-center animate-pulse-slow">
            <p className="text-xs text-ink-400">
              Ollama is processing your transcript locally. No data leaves your
              machine.
            </p>
          </div>
        )}
      </div>

      {/* Right: Results */}
      <div>
        {result ? (
          <AnalysisResult data={result} />
        ) : (
          <div className="card p-10 text-center flex flex-col items-center justify-center min-h-80 text-ink-300">
            <div className="w-16 h-16 rounded-2xl bg-ink-100 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-ink-300" />
            </div>
            <p className="font-display text-xl text-ink-400">
              Analysis will appear here
            </p>
            <p className="text-sm mt-1">
              Paste a transcript and click Run Analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
