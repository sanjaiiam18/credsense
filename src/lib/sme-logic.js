/**
 * CredSense AI — SME Credit Scoring Engine
 * Simulates a real alternative-data credit model.
 */

// Normalize a value to 0–100 range
function normalize(value, min, max) {
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

// Convert 0–100 component score to credit score points
function toPoints(normalizedScore, weight, maxContrib) {
  return (normalizedScore / 100) * maxContrib * weight;
}

/**
 * Main SME credit scoring function
 * @param {Object} inputs
 * @param {number} inputs.monthlyRevenue - Monthly revenue in ₹
 * @param {number} inputs.numTransactions - Number of monthly transactions
 * @param {number} inputs.utilityConsistency - 0–100 slider
 * @param {number} inputs.businessAge - Years in operation
 * @param {boolean} inputs.hasCreditHistory - Existing credit history
 * @returns {Object} Full credit analysis
 */
export function generateSMECreditAnalysis(inputs) {
  const { monthlyRevenue, numTransactions, utilityConsistency, businessAge, hasCreditHistory } = inputs;

  // --- Component Scores (0–100) ---
  const revenueScore = normalize(monthlyRevenue, 20000, 1000000);
  const transactionScore = normalize(numTransactions, 5, 500);
  const utilityScore = utilityConsistency; // already 0–100
  const businessAgeScore = normalize(businessAge, 0, 10);
  const behaviorScore = (() => {
    let base = (revenueScore * 0.4) + (transactionScore * 0.3) + (utilityScore * 0.3);
    if (hasCreditHistory) base = Math.min(100, base + 15);
    return base;
  })();

  // --- Weighted credit score (300–850 range) ---
  const rawScore =
    (revenueScore * 0.25) +
    (transactionScore * 0.20) +
    (utilityScore * 0.20) +
    (businessAgeScore * 0.15) +
    (behaviorScore * 0.20);

  const creditScore = Math.round(300 + (rawScore / 100) * 550);

  // --- Loan Decision ---
  const isApproved = creditScore >= 700;

  // --- Default Risk ---
  let riskLevel, riskPercent;
  if (creditScore >= 750) {
    riskLevel = "Low";
    riskPercent = Math.round(2 + (850 - creditScore) * 0.08);
  } else if (creditScore >= 650) {
    riskLevel = "Medium";
    riskPercent = Math.round(8 + (750 - creditScore) * 0.12);
  } else {
    riskLevel = "High";
    riskPercent = Math.round(20 + (650 - creditScore) * 0.15);
  }

  // --- Explainability: point contributions ---
  const maxContrib = 550 / 5; // average contribution per factor if equal weight
  const contributions = {
    revenue: Math.round(revenueScore * 0.25 * 5.5),
    transactions: Math.round(transactionScore * 0.20 * 5.5),
    utility: Math.round(utilityScore * 0.20 * 5.5),
    businessAge: Math.round(businessAgeScore * 0.15 * 5.5),
    behavior: Math.round(behaviorScore * 0.20 * 5.5),
  };

  // --- Loan Simulator ---
  const approvalProbability = Math.min(99, Math.max(5, Math.round(((creditScore - 300) / 550) * 100)));
  const recommendedMin = Math.round((creditScore / 850) * 500000 * 0.5);
  const recommendedMax = Math.round((creditScore / 850) * 2000000);
  const interestRate = Math.max(9, Math.round((18 - ((creditScore - 300) / 550) * 10) * 10) / 10);

  return {
    creditScore,
    isApproved,
    riskLevel,
    riskPercent: Math.min(riskPercent, 60),
    componentScores: {
      revenue: Math.round(revenueScore),
      transactions: Math.round(transactionScore),
      utility: Math.round(utilityScore),
      businessAge: Math.round(businessAgeScore),
      behavior: Math.round(behaviorScore),
    },
    contributions,
    approvalProbability,
    recommendedMin,
    recommendedMax,
    interestRate,
  };
}

export const DEMO_DATA = {
  monthlyRevenue: 250000,
  numTransactions: 120,
  utilityConsistency: 82,
  businessAge: 4,
  hasCreditHistory: false,
};
