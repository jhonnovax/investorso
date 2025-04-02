"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { calculateCompoundInterest } from "@/services/calculator";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import InvestmentChart from "@/components/calculator/InvestmentChart";
import InvestmentTable from "@/components/calculator/InvestmentTable";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/scrollTop";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [calculationParams, setCalculationParams] = useState({
    initialInvestment: 0,
    monthlyContribution: 833,
    years: 30,
    annualInterestRate: 7,
    compoundFrequency: "annually",
  });

  function onBlur(calculationParams) {
    setCalculationParams(calculationParams);
  }

  function onSubmit(calculationParams) {
    setCalculationParams(calculationParams);
    setIsOpen(false);
  }

  useEffect(() => {
    setResults(calculateCompoundInterest(calculationParams));
  }, [calculationParams]);

  const mobileDrawerContent = (
    <div className="py-4">
      <CalculatorForm 
        onBlur={onBlur}
        onSubmit={onSubmit}
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
                <InvestmentChart calculationParams={calculationParams} results={results} />
                <InvestmentTable years={calculationParams.years} results={results} />
              </>
            )}
          </div>

          <div className="hidden lg:block lg:sticky lg:top-8 self-start max-h-[calc(100vh-6rem)] overflow-y-auto bg-base-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Calculator Parameters</h2>
            <CalculatorForm 
              onBlur={onBlur}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </main>

      <Footer />

      <ScrollTop />

    </div>
  );
}
