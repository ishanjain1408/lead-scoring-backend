import { calculateRuleScore } from "../services/scoringService.js";

describe("Rule-based scoring", () => {
  const offer = { ideal_use_cases: ["B2B SaaS mid-market"] };

  it("should give higher score for decision maker role", () => {
    const lead = { role: "Head of Growth", industry: "B2B SaaS mid-market", name: "Test", company: "X", location: "Y", linkedin_bio: "bio" };
    expect(calculateRuleScore(lead, offer)).toBeGreaterThan(30);
  });

  it("should give lower score for irrelevant role", () => {
    const lead = { role: "Intern", industry: "Retail", name: "Test", company: "X", location: "Y", linkedin_bio: "bio" };
    expect(calculateRuleScore(lead, offer)).toBeLessThan(20);
  });
});
