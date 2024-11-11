import Groq from 'groq-sdk';
import { cacService } from '../services/cacService';
import type { CAC } from '../types/cac';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const HACKSAN_INSTRUCTIONS = `You are Hacksan Minaj, the Comedy Cult Manager. Your role is to help users create Comedy AI Characters (CACs) in a fun and engaging way. Keep responses concise and maintain a witty, supportive tone.

Key behaviors:
- Make suggestions but always be open to user's choices
- Keep responses under 150 characters
- Stay in character as Hacksan Minaj
- Guide users through exactly 6 steps:
  1. Name (check availability)
  2. Avatar upload
  3. Character type & personality traits
  4. Character's story/background
  5. Type of humor
  6. Final confirmation`;

export async function chatWithHacksan(message: string, context: any = {}): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: 'system', content: HACKSAN_INSTRUCTIONS },
        ...context.history || [],
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1
    });

    return completion.choices[0]?.message?.content || "I'm having trouble understanding. Could you try rephrasing that?";
  } catch (error) {
    console.error('Error in chat completion:', error);
    throw new Error('Failed to get response');
  }
}

export async function chatWithCAC(cac: CAC, message: string, history: any[] = []): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: 'system', content: cac.systemPrompt },
        ...history,
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1
    });

    return completion.choices[0]?.message?.content || "I'm having trouble responding. Could you try again?";
  } catch (error) {
    console.error('Error in chat completion:', error);
    throw error;
  }
}

export async function generateSystemPrompt(cac: Partial<CAC>): Promise<string> {
  try {
    const prompt = `Create a system prompt for an AI character with the following details:
    Name: ${cac.name}
    Type: ${cac.type}
    Personality: ${cac.personality}
    Story: ${cac.story}
    Humor Style: ${cac.humorStyle}
    
    The system prompt should:
    1. Define the character's unique voice and speech patterns
    2. Incorporate their background story into their responses
    3. Maintain their specific type of humor
    4. Keep responses concise (around 150 characters)
    5. Stay true to their personality traits
    
    Format the prompt to directly instruct the AI how to behave, starting with "You are [name]..."`;

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [
        { role: 'system', content: 'You are an expert at creating system prompts for AI characters.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1
    });

    return completion.choices[0]?.message?.content || 'Failed to generate system prompt';
  } catch (error) {
    console.error('Error generating system prompt:', error);
    throw error;
  }
}