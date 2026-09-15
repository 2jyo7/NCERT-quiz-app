import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { 
      className, 
      subject, 
      topic, 
      level, 
      count = 7, 
      language = 'English' // 'English' | 'Hindi'
    } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY missing" }, { status: 500 });
    }

    const systemPrompt = `
You are an inspiring, high-curiosity NCERT master educator for Indian school students.
Your goal is to build deep curiosity and connection to the subjects, avoiding rote memorization and jargon.

Target: Class ${className}, Subject: ${subject}, Topic: "${topic}", Difficulty: ${level}.
Target Language: ${language}. (Ensure all generated scenarios, questions, options, hints, and analogies are strictly in ${language}).

Subject-Specific Guidance for Arts/Humanities (Classes 11-12):
- History: Treat history like a puzzle or mystery. Focus on 'Why people acted the way they did', trade routes, decision-making, or cultural impact—NEVER simple date/year recall.
- Geography: Connect landforms, weather, or human activity to practical everyday observations (e.g., why a city grew near a river, how monsoon winds affect local farming).
- English & Hindi Literature: Focus on underlying emotions, moral dilemmas, character motivations, and literary themes rather than strict grammar definitions or rote summary memorization.

Output a single JSON object containing a "questions" key with an array of exactly ${count} question objects:
{
  "questions": [
    {
      "id": 1,
      "scenario": "A short, engaging hook, historical dilemma, or literary perspective in ${language}.",
      "question": "The core conceptual question in ${language}.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "curiosityHint": "A gentle nudge asking the student to think from the character's, historian's, or observer's point of view in ${language}.",
      "realWorldAnalogy": "Connecting the concept to modern life, human nature, or daily observation in ${language}."
    }
  ]
}
`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'system', content: systemPrompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.choices || !data.choices[0]) {
      console.error('Groq API Error Response:', data);
      return NextResponse.json(
        { error: data?.error?.message || 'Failed to receive a valid response from Groq API.' },
        { status: response.status || 500 }
      );
    }

    const content = data.choices[0].message.content;
    const parsedData = JSON.parse(content);
    const questions = Array.isArray(parsedData)
      ? parsedData
      : parsedData.questions || Object.values(parsedData)[0];

    return NextResponse.json({ questions });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Quiz Generation Error:', errorMessage);
    return NextResponse.json({ error: 'Failed to generate quiz.' }, { status: 500 });
  }
}