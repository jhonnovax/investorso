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
      annualInterestRate,
    } = formData;

    const monthlyRate = annualInterestRate / 100 / 12;
    const totalMonths = years * 12;
    const data = [];

    let totalContributions = initialInvestment;
    let simpleInterest = initialInvestment;
    let compoundInterest = initialInvestment;

    for (let month = 0; month <= totalMonths; month++) {      
      if (month > 0) {
        totalContributions += monthlyContribution;
        compoundInterest = compoundInterest * (1 + monthlyRate) + monthlyContribution;
        simpleInterest = (compoundInterest - totalContributions)
      }

      data.push({
        period: month,
        contributions: Math.round(totalContributions),
        simpleInterest: Math.round(simpleInterest),
        compoundInterest: Math.round(compoundInterest)
      });
      
    }

    if (years > 1) {
      return data .filter((_, index) => index % 12 === 0).map((result, index) => ({
        ...result,
        period: index,
      }));
    }


    return data;
  }