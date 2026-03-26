import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { name, skills } = await req.json();

  const prompt = `
  Create a professional resume summary for:
  Name: ${name}
  Skills: ${skills}
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'user', content: prompt }
    ],
  });

  return Response.json({
    text: response.choices[0].message.content,
  });
}