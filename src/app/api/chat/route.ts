import { GoogleGenerativeAI } from "@google/generative-ai";
import { AGATHOS_SYSTEM_PROMPT } from "@/lib/knowledge-base";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Pick up env vars inside the handler to ensure they are fresh
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const modelName = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-1.5-flash";

    if (!apiKey) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY is not defined in environment");
      return new Response(JSON.stringify({ error: "Missing API Key. Please ensure .env.local is set up correctly." }), {
        status: 500,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log(`[Agathos AI] Calling ${modelName} with key ${apiKey.slice(0, 8)}...`);

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: AGATHOS_SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood. I am the Agathos AI Digital Receptionist. I am ready to help you." }] },
        ...messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
      ],
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ content: text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    const isRateLimited = /\b429\b|resource exhausted|rate.?limit/i.test(errorMessage);
    return new Response(
      JSON.stringify({
        error: isRateLimited
          ? "The AI model is temporarily overloaded. Please try again in a minute."
          : errorMessage
      }),
      { status: isRateLimited ? 429 : 500 }
    );
  }
}
