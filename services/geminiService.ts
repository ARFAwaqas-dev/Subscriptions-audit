
import { GoogleGenAI, Type } from "@google/genai";
import { UsageFrequency } from "../types";

export const analyzeStatement = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following bank statement lines and extract potential recurring monthly subscriptions. 
    Look for keywords like Netflix, Hulu, HBO, Gym, Spotify, Amazon, Adobe, Microsoft, Zoom, etc.
    Statement text:
    ${text}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Commercial name of the subscription service" },
            price: { type: Type.NUMBER, description: "Monthly cost estimated from the statement" },
            category: { type: Type.STRING, description: "Category like Entertainment, Software, Fitness, Utilities" }
          },
          required: ["name", "price", "category"]
        }
      }
    }
  });

  const responseText = response.text;
  if (!responseText) {
    console.warn("Gemini returned an empty response.");
    return [];
  }

  try {
    const rawData = JSON.parse(responseText.trim());
    return rawData.map((item: any) => ({
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      frequency: UsageFrequency.WEEKLY, // Default to weekly, user can change
      isWaste: false
    }));
  } catch (error) {
    console.error("Failed to parse Gemini response:", error, "Response text was:", responseText);
    return [];
  }
};
