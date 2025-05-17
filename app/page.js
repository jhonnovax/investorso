"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { calculateCompoundInterest } from "@/services/calculator-service";
import CalculatorForm from "@/components/CalculatorForm";
import InvestmentChart from "@/components/InvestmentChart";
import InvestmentTable from "@/components/InvestmentTable";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import config from "@/config";

export default function Page() {
  const { appName, appDescription } = config;
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
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileContent={mobileDrawerContent}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="sr-only">{appName} | Investorso</h1>
        <p className="sr-only">{appDescription}</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {results.length > 0 && (
              <>
                <InvestmentChart calculationParams={calculationParams} results={results} />
                <InvestmentTable years={calculationParams.years} results={results} />
                <Footer />
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

      <ScrollTop />

    </div>
  );
}
