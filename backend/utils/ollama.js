const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

export async function callOllama(prompt) {
  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
      options: {
        temperature: 0.2, // Lower temp for more consistent structured output
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.response;
}

export function parseStructuredOutput(rawText) {
  // Strategy 1: Direct JSON parse
  try {
    return JSON.parse(rawText.trim());
  } catch (_) {}

  // Strategy 2: Extract JSON from markdown fences
  const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch (_) {}
  }

  // Strategy 3: Find first { ... } block
  const braceStart = rawText.indexOf('{');
  const braceEnd = rawText.lastIndexOf('}');
  if (braceStart !== -1 && braceEnd !== -1) {
    try {
      return JSON.parse(rawText.slice(braceStart, braceEnd + 1));
    } catch (_) {}
  }

  throw new Error('Could not parse structured JSON from LLM response');
}

export { MODEL };
