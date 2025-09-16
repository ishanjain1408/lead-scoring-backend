import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Call OpenAI to classify intent for a lead
 */
export const getAIIntent = async (offer, lead) => {
  const prompt = `
  Offer: ${offer.name}
  Value Props: ${offer.value_props.join(", ")}
  Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}
  
  Lead:
  Name: ${lead.name}
  Role: ${lead.role}
  Company: ${lead.company}
  Industry: ${lead.industry}
  Location: ${lead.location}
  LinkedIn Bio: ${lead.linkedin_bio}
  
  Task: Classify intent as High, Medium, or Low. 
  Respond with JSON { "intent": "...", "reasoning": "..." }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  try {
    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    return { intent: "Low", reasoning: "AI parsing failed" };
  }
};
