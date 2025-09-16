import { getAIIntent } from "./aiService.js";

/**
 * Rule-based scoring function
 */
const calculateRuleScore = (lead, offer) => {
  let score = 0;

  // Role relevance
  if (/head|chief|vp|director/i.test(lead.role)) score += 20;
  else if (/manager|lead/i.test(lead.role)) score += 10;

  // Industry match
  if (offer.ideal_use_cases.some(u => new RegExp(u, "i").test(lead.industry))) {
    score += 20;
  } else if (/tech|software|consulting/i.test(lead.industry)) {
    score += 10;
  }

  // Data completeness
  if (Object.values(lead).every(v => v && v.trim() !== "")) score += 10;

  return score;
};

/**
 * Full scoring pipeline
 */
export const runScoringPipeline = async (leads, offer) => {
  const results = [];

  for (const lead of leads) {
    const ruleScore = calculateRuleScore(lead, offer);

    const aiResult = await getAIIntent(offer, lead);
    let aiPoints = aiResult.intent === "High" ? 50 : aiResult.intent === "Medium" ? 30 : 10;

    results.push({
      ...lead,
      intent: aiResult.intent,
      score: ruleScore + aiPoints,
      reasoning: aiResult.reasoning,
    });
  }

  return results;
};

export { calculateRuleScore };
