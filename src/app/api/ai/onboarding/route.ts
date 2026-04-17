import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { action, questionId, questionText, currentText, context } = await req.json();
    
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const modelName = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-1.5-flash";

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    let prompt = "";
    if (action === "rewrite") {
      prompt = `
        You are an expert grant writer and social impact consultant for Agathos, a giving platform.
        Your task is to rewrite the following draft for an onboarding question to make it more professional, compelling, and clear, while maintaining the original meaning.
        Keep it concise but impactful.

        Question: ${questionText}
        User's Draft: ${currentText}
        
        Provide only the rewritten text. No preamble, no quotes.
      `;
    } else if (action === "suggest") {
      prompt = `
        You are an expert grant writer and social impact consultant for Agathos, a giving platform.
        Your task is to suggest a high-quality, professional response to an onboarding question for a charity/social project.
        Use any provided context about the project/organisation to make the suggestion relevant.

        Context: ${JSON.stringify(context)}
        Question: ${questionText}
        
        Provide a 2-3 sentence suggestion that the user can adapt. No preamble, no quotes.
      `;
    } else if (action === "summarize") {
      prompt = `
        You are an expert grant writer and social impact consultant for Agathos.
        Based on the following project application details, provide a concise, high-impact 2-sentence summary of the project submission.
        Focus on the mission, the project location, and intended impact.
        Use a professional and inspiring tone.

        Application Details: ${JSON.stringify(context)}
        
        Provide only the summary text. No preamble, no quotes.
      `;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim().replace(/^["']|["']$/g, '');

    if (!text) {
      return new Response(JSON.stringify({ error: "AI generated an empty response" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ suggestion: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("AI Onboarding error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown server error";
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
