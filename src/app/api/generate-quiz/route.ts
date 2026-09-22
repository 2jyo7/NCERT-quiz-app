import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { 
      className, 
      subject, 
      topic, 
      level, 
      count = 7, 
      language = 'English' 
    } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 500 });
    }

    const randomSeed = Math.floor(Math.random() * 1000000);
    const timestamp = new Date().toISOString();

    const systemPrompt = `
You are an inspiring, high-curiosity NCERT master educator for Indian school students.
Your goal is to build deep curiosity and connection to the subjects, avoiding rote memorization and jargon.

Target: Class ${className}, Subject: ${subject}, Topic: "${topic}", Difficulty: ${level}.
Target Language: ${language}. (Ensure all generated scenarios, questions, options, hints, and analogies are strictly in ${language}).

Subject-Specific Guidance for Arts/Humanities (Classes 11-12):
- History: Treat history like a puzzle or mystery. Focus on 'Why people acted the way they did', trade routes, decision-making, or cultural impact—NEVER simple date/year recall.
- Geography: Connect landforms, weather, or human activity to practical everyday observations.
- English & Hindi Literature: Focus on underlying emotions, moral dilemmas, character motivations, and literary themes.

CRITICAL INSTRUCTIONS:
1. You MUST generate EXACTLY ${count} unique questions.
2. Ensure every question focuses on a DIFFERENT angle or sub-concept within the topic.
3. Generation Timestamp: ${timestamp} | Unique Seed ID: ${randomSeed}

Output a single JSON object containing a "questions" key with an array of EXACTLY ${count} question objects:
{
  "questions": [
    {
      "id": 1,
      "scenario": "A short, engaging hook in ${language}.",
      "question": "The core conceptual question in ${language}.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "curiosityHint": "A gentle nudge asking the student to think from an observer's point of view in ${language}.",
      "realWorldAnalogy": "Connecting the concept to modern life in ${language}."
    }
  ]
}
`;

    // Active production models on Groq
    const candidateModels = [
      'llama-3.3-70b-versatile',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'llama-3.1-8b-instant'
    ];

    let extractedQuestions: any[] | null = null;
    let lastError: string | null = null;

    for (const modelName of candidateModels) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: modelName,
            messages: [{ role: 'system', content: systemPrompt }],
            response_format: { type: 'json_object' },
            temperature: 0.85,
            top_p: 0.95,
            max_tokens: 4000,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data?.choices?.[0]?.message?.content) {
          lastError = data?.error?.message || `Model ${modelName} returned HTTP ${response.status}`;
          console.warn(`Groq model ${modelName} failed: ${lastError}`);
          continue;
        }

        const rawContent = data.choices[0].message.content;
        const parsed = JSON.parse(rawContent);

        // Safe array extraction logic
        let parsedArray: any[] | null = null;
        if (Array.isArray(parsed)) {
          parsedArray = parsed;
        } else if (Array.isArray(parsed.questions)) {
          parsedArray = parsed.questions;
        } else {
          // Find first array property in object dynamically
          const foundArray = Object.values(parsed).find((val) => Array.isArray(val));
          if (foundArray && Array.isArray(foundArray)) {
            parsedArray = foundArray;
          }
        }

        if (parsedArray && parsedArray.length > 0) {
          extractedQuestions = parsedArray;
          break; // Success! Exit loop
        }
      } catch (err) {
        console.warn(`Parsing or fetch error with model ${modelName}:`, err);
      }
    }

    if (!extractedQuestions) {
      return NextResponse.json(
        { error: lastError || 'Failed to generate questions across all candidate models.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ questions: extractedQuestions.slice(0, count) });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Quiz Generation Error:', errorMessage);
    return NextResponse.json({ error: 'Failed to generate quiz.' }, { status: 500 });
  }
}
