"use client";

import { useState, useEffect } from "react";
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState(calculateCompoundInterest(defaultFormData));

  // Add scroll handler
  useEffect(() => {
    function handleScroll() {
      setShowScrollTop(window.scrollY > 200);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
    } else if (Number(formData.years) > 100) {
      errors.years = 'Number of years less than 100';
    }

    if (formData.annualInterestRate === undefined) {
      errors.annualInterestRate = 'Enter an annual interest rate';
    } else if (Number(formData.annualInterestRate) > 100) {
      errors.annualInterestRate = 'Annual interest rate less than 100';
    }
    
    return errors;
  }

  function onCalculate() {
    setErrors({});
    const errors = onValidate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    // Format data
    formData.initialInvestment = parseFloat(formData.initialInvestment);
    formData.monthlyContribution = parseFloat(formData.monthlyContribution);
    formData.years = parseInt(formData.years);
    formData.annualInterestRate = parseFloat(formData.annualInterestRate);

    // Calculate results
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

          <div className="hidden lg:block lg:sticky lg:top-8 self-start max-h-[calc(100vh-6rem)] overflow-y-auto bg-base-100 p-4 rounded-lg shadow-sm">
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

      {/* Add scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 flex items-center justify-center btn btn-circle btn-primary btn-md shadow-lg tooltip tooltip-left transition-opacity duration-300 ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        data-tip="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
}
