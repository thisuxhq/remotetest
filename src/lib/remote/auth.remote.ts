import { command } from '$app/server';
import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/private';

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });


export const enhanceText = command('unchecked',async (payload) => {
        const model = 'gemini-2.5-flash-lite-preview-06-17';

        const contents = [
            {
                role: 'user',
                parts: [
                    {
                        text: `Enhance this text: ${payload.text}`
                    }
                ]
            }
        ];

        const response = await ai.models.generateContent({
            model,
            contents,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: 'object',
                    required: ['enhancedText'],
                    properties: {
                        enhancedText: { type: 'string', description: 'The improved text' }
                    }
                },
                systemInstruction: [
                    {
                        text: `You are an expert writing assistant. When given user text, you:
1. Enhance clarity, grammar, and style.
2. Elaborate and expand on ideas, making the text more detailed, expressive, and engaging.
3. Add vivid descriptions, examples, and context where appropriate.
4. Ensure the result is easy to read, professional, and suitable for publication.
Always return your output as the 'enhancedText' property in JSON.`
                    }
                ]
            }
        });

        if (!response.text) throw new Error('No response text received from AI');
        console.log('AI Response:', response.text);

        return JSON.parse(response.text);
    }
);
