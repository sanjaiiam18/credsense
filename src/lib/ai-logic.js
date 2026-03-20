// Simulated Backend Logic for CredSense AI

export function generateCreditAnalysis(userData) {
  // 1. Credit Score Formula (Base: 300-900)
  // Weighted factors:
  // Income (+), Payment History (++), Credit Util (-), Savings (+), Alternative Data (+)
  
  let score = 550; // Starting baseline
  
  // Income factor
  if (userData.income > 10000) score += 60;
  else if (userData.income > 5000) score += 40;
  else score += 15;

  // Credit utilization (simulating based on expenses vs savings)
  const savingsRatio = userData.savingsRatio || 20;
  if (savingsRatio > 30) score += 55;
  else if (savingsRatio > 15) score += 25;
  else score -= 30;

  // Alternative data
  const socialTrust = userData.socialTrust || 85;
  score += (socialTrust - 50) * 0.8;

  // Cap score bounds
  score = Math.floor(Math.min(900, Math.max(300, score)));

  // 2. Default Risk (Logistic-style probability output)
  // Simulating a sigmoid function output based on score
  const z = -10 + (900 - score) * 0.025; // simple linear transform to z
  const probability = 1 / (1 + Math.exp(-z));
  const defaultRiskPercentage = (probability * 100).toFixed(1);
  
  let riskLevel = "Medium";
  if (defaultRiskPercentage < 5) riskLevel = "Low";
  if (defaultRiskPercentage > 15) riskLevel = "High";

  // 3. Explainability (Return feature contribution values - mock SHAP)
  const shapFeatures = [
    { feature: "Payment History", value: "+85", impact: "positive", width: "85%" },
    { feature: "Income Stability", value: "+42", impact: "positive", width: "42%" },
    { feature: "Savings Ratio", value: "+30", impact: "positive", width: "30%" },
    { feature: "Credit Utilization", value: "-25", impact: "negative", width: "25%" },
    { feature: "Thin-File Penalty", value: "-15", impact: "negative", width: "15%" },
    { feature: "Recent Inquiries", value: "-10", impact: "negative", width: "10%" },
  ];

  return {
    score,
    defaultRiskPercentage,
    riskLevel,
    shapFeatures,
    // Provide some actionable insights
    insights: [
      "You can improve your score by reducing credit utilization to below 30%.",
      "Pay EMIs on time for the next 3 months to boost payment history weight.",
      "Your high savings ratio gives a strong buffer against default risk.",
    ]
  };
}
