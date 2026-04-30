export const RUBRIC_CONTEXT = `
FELLOW ASSESSMENT RUBRIC (1-10 scale):
- 1-2: Critical issues. Fellow is not meeting basic expectations. Supervisor describes confusion, inaction, or recurring mistakes.
- 3-4: Below expectations. Fellow is trying but struggling. Output is inconsistent or requires excessive hand-holding.
- 5-6: Meeting expectations. Fellow is reliable, delivers what's asked, communicates adequately.
- 7-8: Exceeding expectations. Fellow is proactive, takes initiative, shows strategic thinking.
- 9-10: Exceptional. Fellow is driving impact independently, seen as a peer/collaborator by the supervisor.

ASSESSMENT DIMENSIONS (what the rubric measures):
1. Reliability & Delivery – Does the Fellow do what they say they'll do, on time?
2. Communication Quality – Is communication clear, timely, and appropriate?
3. Initiative & Ownership – Does the Fellow go beyond the task list?
4. Systems Building – Does the Fellow create processes, templates, or playbooks?
5. Stakeholder Management – How does the Fellow navigate relationships?
6. Learning Agility – How quickly does the Fellow adapt and incorporate feedback?
7. Impact Visibility – Is the Fellow's contribution recognized and measurable?
8. Team Integration – How does the team respond to and engage with the Fellow?

8 BUSINESS KPIs THE FELLOW'S WORK MAY CONNECT TO:
1. Revenue Growth – Activities that directly or indirectly drive sales or revenue
2. Cost Efficiency – Work that reduces operational costs or improves resource utilization
3. Customer Satisfaction – Initiatives that improve client/customer experience
4. Team Productivity – Work that enables the team to do more with less
5. Process Improvement – Creating or optimizing workflows, systems, SOPs
6. Data & Insights – Generating analytics, reports, or research that informs decisions
7. Brand & Visibility – Work that improves organizational reputation or reach
8. Talent & Culture – Initiatives around hiring, onboarding, retention, or team morale
`;

export const buildAnalysisPrompt = (transcript) => `
You are an expert assessment analyst evaluating a DeepThought Fellow's performance based on a supervisor's transcript.

${RUBRIC_CONTEXT}

SUPERVISOR TRANSCRIPT:
"""
${transcript}
"""

Analyze this transcript and return a JSON object with EXACTLY this structure (no extra text, no markdown, pure JSON):

{
  "extractedEvidence": [
    {
      "quote": "exact quote from transcript",
      "sentiment": "positive|negative|neutral",
      "dimension": "one of the 8 assessment dimensions",
      "explanation": "1-2 sentence explanation of why this quote is significant"
    }
  ],
  "rubricScore": {
    "score": <number 1-10>,
    "justification": "One paragraph citing specific evidence from the transcript explaining this score using the rubric criteria"
  },
  "kpiMapping": [
    {
      "kpi": "one of the 8 KPI names",
      "description": "how the Fellow's work connects to this KPI",
      "evidence": "brief quote or reference from transcript"
    }
  ],
  "gapAnalysis": [
    {
      "dimension": "assessment dimension not covered",
      "description": "what information is missing and why it matters"
    }
  ],
  "followUpQuestions": [
    {
      "question": "specific question to ask in next call",
      "targetGap": "which gap or dimension this addresses"
    }
  ]
}

STRICT ANTI-HALLUCINATION RULES — FOLLOW EXACTLY:
- GROUND EVERYTHING IN THE TRANSCRIPT: Every claim, quote, and evidence item must come directly from the transcript. Do not infer, assume, or fabricate anything.
- EXACT QUOTES ONLY: The "quote" field must be a verbatim copy of words spoken in the transcript. Never paraphrase or reconstruct a quote.
- NO INVENTION: If a dimension or KPI is not supported by explicit transcript content, do NOT include it. It is better to have fewer items than to hallucinate.
- CONFIDENCE SCORING: Set "confidence" to "high" if the quote directly and clearly supports the claim, "medium" if it partially supports it, and "low" if it is ambiguous. Never assign "high" confidence to inferred claims.
- INSUFFICIENT DATA: If the transcript does not contain enough information to reliably score the Fellow, set "insufficient_data": true in rubricScore and explain why in the justification.
- KPI EVIDENCE: Only map KPIs with a direct, clear connection to transcript content. Do not stretch or assume connections.
- GAP ANALYSIS: Only list dimensions that are genuinely absent from the transcript. Do not list a dimension as a gap if any mention of it exists.
- followUpQuestions: exactly 3-5 questions, each targeting a specific gap.
- Return ONLY valid JSON. No preamble, no explanation, no markdown fences.
`;
