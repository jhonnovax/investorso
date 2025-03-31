"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { calculateCompoundInterest } from "@/services/calculator";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import InvestmentTable from "@/components/calculator/InvestmentTable";

const defaultFormData = {
  initialInvestment: 0,
  monthlyContribution: 833,
  years: 30,
  annualInterestRate: 7,
  compoundFrequency: "annually",
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(calculateCompoundInterest(defaultFormData));

  function onValidate() {
    const errors = {};

    if (formData.initialInvestment === undefined) {
      errors.initialInvestment = 'Enter an initial investment';
    }

    if (formData.monthlyContribution === undefined) {
      errors.monthlyContribution = 'Enter a monthly contribution';
    }

    if (formData.years === undefined) {
      errors.years = 'Enter a number of years';
    }

    if (formData.annualInterestRate === undefined) {
      errors.annualInterestRate = 'Enter an annual interest rate';
    }
    
    return errors;
  }

  function onCalculate() {
    const errors = onValidate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setResults(calculateCompoundInterest(formData));
    setIsOpen(false);
  }

  const mobileDrawerContent = (
    <div className="py-4">
      <CalculatorForm 
        formData={formData}
        errors={errors}
        setFormData={setFormData}
        onCalculate={onCalculate}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200">
      <Header 
        links={[]}
        cta={null}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileContent={mobileDrawerContent}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {results.length > 0 && (
              <>
                <InvestmentChart years={formData.years} results={results} />
                <InvestmentTable years={formData.years} results={results} />
              </>
            )}
          </div>

          <div className="hidden lg:block lg:sticky lg:top-8 self-start h-[calc(100vh-6rem)] overflow-y-auto bg-base-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Calculator Parameters</h2>
            <CalculatorForm 
              formData={formData}
              errors={errors}
              setFormData={setFormData}
              onCalculate={onCalculate}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
