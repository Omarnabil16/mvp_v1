import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface CAC {
  id: string;
  name: string;
  description: string;
  image: string;
  systemInstructions: string;
  type: string;
  rating: number;
  users: number;
}

export async function chatWithCAC(cac: CAC, message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: cac.systemInstructions
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error chatting with CAC:", error);
    return "Sorry, there was an error processing your request.";
  }
}