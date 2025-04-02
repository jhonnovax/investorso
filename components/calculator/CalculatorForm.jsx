"use client";
import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';

export default function CalculatorForm({ onBlur, onSubmit }) {
  const [errors, setErrors] = useState({});
  const [calculationParams, setCalculationParams] = useState({
    initialInvestment: 0,
    monthlyContribution: 833,
    years: 30,
    annualInterestRate: 7,
    compoundFrequency: "annually",
  });

  function formatValues(calculationParams) {
    const calculationParamsFormatted = {};

     // Format data
     calculationParamsFormatted.initialInvestment = calculationParams.initialInvestment === '' 
      ? null 
      : parseFloat(calculationParams.initialInvestment);

     calculationParamsFormatted.monthlyContribution = calculationParams.monthlyContribution === '' 
      ? null 
      : parseFloat(calculationParams.monthlyContribution);

     calculationParamsFormatted.years = calculationParams.years === '' 
      ? null 
      : parseInt(calculationParams.years);

     calculationParamsFormatted.annualInterestRate = calculationParams.annualInterestRate === '' 
      ? null 
      : parseFloat(calculationParams.annualInterestRate);

      calculationParamsFormatted.compoundFrequency = calculationParams.compoundFrequency;

     return calculationParamsFormatted;
  }

  function onValidate() {
    const errors = {};

    if (calculationParams.initialInvestment === undefined) {
      errors.initialInvestment = 'Enter an initial investment';
    }

    if (calculationParams.monthlyContribution === undefined) {
      errors.monthlyContribution = 'Enter a monthly contribution';
    }

    if (calculationParams.years === undefined) {
      errors.years = 'Enter a number of years';
    } else if (Number(calculationParams.years) > 100) {
      errors.years = 'Number of years less than 100';
    }

    if (calculationParams.annualInterestRate === undefined) {
      errors.annualInterestRate = 'Enter an annual interest rate';
    } else if (Number(calculationParams.annualInterestRate) > 100) {
      errors.annualInterestRate = 'Annual interest rate less than 100';
    }
    
    return errors;
  }

  function onBlurField() {
    setErrors({});
    const calculationParamsFormatted = formatValues(calculationParams);
    const errors = onValidate(calculationParamsFormatted);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onBlur(calculationParamsFormatted);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setErrors({});
    const calculationParamsFormatted = formatValues(calculationParams);
    const errors = onValidate(calculationParamsFormatted);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    onSubmit(calculationParamsFormatted);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label" htmlFor="initial-investment">
          <span className="label-text">Initial Investment ($)</span>
        </label>
        <CurrencyInput
          id="initial-investment"
          className="input input-bordered"
          value={calculationParams.initialInvestment}
          onBlur={onBlurField}
          onValueChange={(value) => 
            setCalculationParams({
              ...calculationParams,
              initialInvestment: value
            })
          }
          prefix="$"
          decimalsLimit={2}
          allowNegativeValue={false}
        />
        {errors.initialInvestment && (
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">{errors.initialInvestment}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="monthly-contribution">
          <span className="label-text">Monthly Contribution ($)</span>
        </label>
        <CurrencyInput
          id="monthly-contribution"
          className="input input-bordered"
          value={calculationParams.monthlyContribution}
          onBlur={onBlurField}
          onValueChange={(value) => 
            setCalculationParams({
              ...calculationParams,
              monthlyContribution: value
            })
          }
          prefix="$"
          decimalsLimit={2}
          allowNegativeValue={false}
        />
        {errors.monthlyContribution && (
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">{errors.monthlyContribution}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="years">
          <span className="label-text">Length of Time in Years</span>
        </label>
        <CurrencyInput
          id="years"
          className="input input-bordered"
          onBlur={onBlurField}
          value={calculationParams.years}
          onValueChange={(value) => 
            setCalculationParams({
              ...calculationParams,
              years: value
            })
          }
          allowDecimals={false}
          allowNegativeValue={false}
          suffix=" years"
          disableGroupSeparators={true}
        />
        {errors.years && (
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">{errors.years}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="annual-interest-rate">
          <span className="label-text">Estimated Annual Interest Rate (%)</span>
        </label>
        <CurrencyInput
          id="annual-interest-rate"
          className="input input-bordered"
          onBlur={onBlurField}
          value={calculationParams.annualInterestRate}
          onValueChange={(value) => 
            setCalculationParams({
              ...calculationParams,
              annualInterestRate: value
            })
          }
          decimalsLimit={2}
          allowNegativeValue={false}
          allowDecimals={true}
          disableGroupSeparators={true}
          suffix="%"
        />
        {errors.annualInterestRate && (
          <p className="text-red-700 dark:text-red-300 text-sm mt-1">{errors.annualInterestRate}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label" htmlFor="compoundFrequency">
          <span className="label-text">Compound Frequency</span>
        </label>
        <select
          id="compoundFrequency"
          className="select select-bordered"
          value={calculationParams.compoundFrequency}
          onBlur={onBlurField}
          onChange={(e) =>
            setCalculationParams({ ...calculationParams, compoundFrequency: e.target.value })
          }
        >
          <option value="annually">Annually</option>
          <option value="semiannually">Semiannually</option>
          <option value="quarterly">Quarterly</option>
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full mt-6"
      >
        Calculate
      </button>
    </form>
  );
} 