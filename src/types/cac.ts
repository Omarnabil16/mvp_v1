export interface CAC {
  id: string;
  name: string;
  description: string;
  inspiration?: string;
  backstory?: string;
  avatar: string;
  personality: string;
  humorStyle: string;
  speechStyle?: string;
  tone?: string;
  systemPrompt: string;
  createdBy: string;
  createdAt: number;
  isPublic: boolean;
}