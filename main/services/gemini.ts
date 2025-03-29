import axios from 'axios';

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
      role: string;
    };
    finishReason: string;
    avgLogprobs: number;
  }[];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: {
      modality: string;
      tokenCount: number;
    }[];
    candidatesTokensDetails: {
      modality: string;
      tokenCount: number;
    }[];
  };
  modelVersion: string;
}

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export async function getDisposalAdvice(materialType: string): Promise<string> {
  try {
    const prompt = `This object is categorized as ${materialType}. How should it be disposed of according to Toronto's waste management standards? Which bin should I place it in for recycling? Pls give a precise answer`;

    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    const { data } = await axios.post<GeminiResponse>(
      `${process.env.EXPO_PUBLIC_GEMINI_API_URL}?key=${process.env.EXPO_PUBLIC_GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response?: { data?: any }, message: string };
      console.error('API Error:', axiosError.response?.data || axiosError.message);
      throw new Error(`API Error: ${axiosError.response?.data?.error?.message || axiosError.message}`);
    }
    console.error('Error getting disposal advice:', error);
    throw new Error('Failed to get disposal advice. Please try again later.');
  }
} 



// import { getDisposalAdvice } from '../services/gemini';

// try {
//   const advice = await getDisposalAdvice('plastic');
//   console.log(advice); // Will show the disposal advice from Gemini
// } catch (error) {
//   console.error(error);
// }