import mongoose from 'mongoose';

const EvidenceSchema = new mongoose.Schema({
  quote: String,
  sentiment: { type: String, enum: ['positive', 'negative', 'neutral'] },
  dimension: String,
  explanation: String,
});

const KPIMappingSchema = new mongoose.Schema({
  kpi: String,
  description: String,
  evidence: String,
});

const GapSchema = new mongoose.Schema({
  dimension: String,
  description: String,
});

const FollowUpSchema = new mongoose.Schema({
  question: String,
  targetGap: String,
});

const AnalysisSchema = new mongoose.Schema(
  {
    transcript: { type: String, required: true },
    extractedEvidence: [EvidenceSchema],
    rubricScore: {
      score: Number,
      justification: String,
    },
    kpiMapping: [KPIMappingSchema],
    gapAnalysis: [GapSchema],
    followUpQuestions: [FollowUpSchema],
    modelUsed: { type: String, default: 'llama3.2' },
    processingTimeMs: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Analysis', AnalysisSchema);
