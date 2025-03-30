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
      compoundFrequency
    } = formData;

    const periodsPerYear = compoundFrequencies[compoundFrequency];
    const ratePerPeriod = annualInterestRate / 100 / periodsPerYear;
    const totalMonths = years * 12;
    const data = [];

    let totalContributions = initialInvestment;
    let simpleInterest = initialInvestment;
    let compoundInterest = initialInvestment;

    for (let month = 0; month <= totalMonths; month++) {      
      if (month > 0) {
        totalContributions += monthlyContribution;        
        const periodsElapsed = (month / 12) * periodsPerYear;
        const compoundFactor = Math.pow(1 + ratePerPeriod, periodsElapsed);
        
        compoundInterest = initialInvestment * compoundFactor + 
                          monthlyContribution * 12 / periodsPerYear * 
                          ((compoundFactor - 1) / ratePerPeriod);

        simpleInterest = totalContributions + 
                        (initialInvestment * (annualInterestRate/100) * (month/12)) + 
                        (monthlyContribution * month * (annualInterestRate/100) * (month/24));
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