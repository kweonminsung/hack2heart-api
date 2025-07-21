import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = 'gemini-2.5-flash';

@Injectable()
export class GeminiService {
  private readonly googleGenAI: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in the environment variables');
    }

    this.googleGenAI = new GoogleGenAI({
      apiKey,
    });
  }

  async analyzeCode(code: string): Promise<string> {
    const prompt = `
The following code was written to impress others and showcase the author's technical skills.

Please analyze it very briefly — in **1 or 2 short sentences only**.

Focus on structure, style, performance, and any noticeable strengths or opportunities for improvement.  
Use clear, professional language.

Respond in English only.

--- BEGIN CODE ---
${code}
--- END CODE ---

`;

    try {
      const response = await this.googleGenAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      });
      console.log('Gemini API Response:', response?.candidates?.[0]?.content);
      const result =
        response?.candidates?.[0]?.content?.parts?.[0]?.text ??
        'No analysis provided';
      return result;
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw new Error('Failed to analyze code with Gemini API');
    }
  }
}
