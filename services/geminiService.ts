
import { GoogleGenAI, Type } from "@google/genai";
import type { CorrectionResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const getWritingCorrection = async (imageFile: File): Promise<CorrectionResult> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);
    
    const prompt = `
      You are an expert English teacher. Analyze the handwritten text in this image.
      1. Identify all errors related to grammar, spelling, tense, punctuation, and word usage.
      2. For each error, provide a clear and concise explanation.
      3. Rewrite the entire text, correcting all mistakes.
      4. In the rewritten text, you MUST wrap any corrected or added words in double asterisks (e.g., **word**). This is for markdown bolding.
      
      Return the result as a JSON object matching the provided schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            corrections: {
              type: Type.ARRAY,
              description: "A list of identified errors with explanations.",
              items: {
                type: Type.OBJECT,
                properties: {
                  type: {
                    type: Type.STRING,
                    description: "The category of the error (e.g., 'Grammar', 'Spelling', 'Tense')."
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "A detailed explanation of the error and the correction."
                  }
                },
                required: ["type", "explanation"]
              }
            },
            correctedText: {
              type: Type.STRING,
              description: "The full, corrected text with changes wrapped in double asterisks for bolding."
            }
          },
          required: ["corrections", "correctedText"]
        }
      }
    });

    const jsonString = response.text;
    const result: CorrectionResult = JSON.parse(jsonString);
    
    if (!result || !result.corrections || !result.correctedText) {
        throw new Error("Invalid response format from the API.");
    }
    
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if(error.message.includes("API key not valid")) {
            throw new Error("The provided API Key is invalid. Please check your configuration.");
        }
        throw new Error(`Failed to get writing correction: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while processing the request.");
  }
};
