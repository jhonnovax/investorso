export const compoundFrequencies = {
  annually: 1,
  semiannually: 2,
  quarterly: 4,
  monthly: 12,
  daily: 365,
};

export function calculateCompoundInterest(formData) {
    const {
      initialInvestment,
      monthlyContribution,
      years,
      interestRate,
    } = formData;

    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;
    const data = [];

    let balance = initialInvestment;
    let totalContributions = initialInvestment;

    for (let month = 0; month <= totalMonths; month++) {
      const randomVariance = 0;
      const effectiveRate = monthlyRate + randomVariance;
      
      if (month > 0) {
        balance = balance * (1 + effectiveRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }

      data.push({
        month,
        contributions: Math.round(totalContributions),
        profit: Math.round(balance - totalContributions),
        balance: Math.round(balance)
      });
    }

    return data;
  }