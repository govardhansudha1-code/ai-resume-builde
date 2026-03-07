export async function generateSummary(jobTitle: string, highlights: string[]) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY is not set');
    }

    const prompt = `
    As an expert resume writer, generate a professional, high-impact resume summary for a ${jobTitle}.
    Key highlights to include: ${highlights.join(', ')}.
    The summary should be concise (3-4 sentences), ATS-friendly, and use strong action verbs.
    Return only the summary text, no conversational filler or labels.
  `;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://ai-resume-builder.local', // Required by OpenRouter
                'X-Title': 'AI Resume Builder', // Optional
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-001', // High performance & low latency
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error('OpenRouter Error:', data.error);
            throw new Error(data.error.message || 'AI generation failed');
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('AI Summary Generation Error:', error);
        throw error;
    }
}

export async function optimizeBulletPoint(bullet: string) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error('OPENROUTER_API_KEY is not set');
    }

    const prompt = `
    As an expert resume writer, improve the following resume bullet point to make it more impactful and results-oriented.
    Use the STAR method (Situation, Task, Action, Result) where possible.
    Original bullet: "${bullet}"
    Return only the improved bullet point text.
  `;

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-001',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('AI Bullet Optimization Error:', error);
        throw error;
    }
}
