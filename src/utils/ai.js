import dotenv from "dotenv";
dotenv.config({ quiet: true });

export async function askAI(question) {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You must respond with only a single word. No punctuation, no explanation, just one word."
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0,
        max_tokens: 10
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Groq API Error ${response.status}:`, errorBody);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    // Enforce single word response
    const firstWord = text.split(/\s+/)[0].replace(/[.,!?;:]/g, '');

    return firstWord;
  } catch (error) {
    console.error("AI Error:", error);

    // Return fallback instead of crashing
    return "Unavailable";
  }
}
