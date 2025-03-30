"use client";
import CurrencyInput from 'react-currency-input-field';

export default function CalculatorForm({ formData, setFormData, onCalculate }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Initial Investment ($)</span>
        </label>
        <CurrencyInput
          id="initial-investment"
          className="input input-bordered"
          value={formData.initialInvestment}
          onValueChange={(value) => 
            setFormData({
              ...formData,
              initialInvestment: value
            })
          }
          prefix="$"
          decimalsLimit={2}
          allowNegativeValue={false}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Monthly Contribution ($)</span>
        </label>
        <CurrencyInput
          id="monthly-contribution"
          className="input input-bordered"
          value={formData.monthlyContribution}
          onValueChange={(value) => 
            setFormData({
              ...formData,
              monthlyContribution: value
            })
          }
          prefix="$"
          decimalsLimit={2}
          allowNegativeValue={false}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Length of Time in Years</span>
        </label>
        <CurrencyInput
          id="years"
          className="input input-bordered"
          value={formData.years}
          onValueChange={(value) => 
            setFormData({
              ...formData,
              years: value
            })
          }
          decimalsLimit={0}
          allowNegativeValue={false}
          suffix=" years"
          disableGroupSeparators={true}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Estimated Annual Interest Rate (%)</span>
        </label>
        <CurrencyInput
          id="annual-interest-rate"
          className="input input-bordered"
          value={formData.annualInterestRate}
          onValueChange={(value) => 
            setFormData({
              ...formData,
              annualInterestRate: value
            })
          }
          decimalsLimit={2}
          allowNegativeValue={false}
          allowDecimals={true}
          disableGroupSeparators={true}
          suffix="%"
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="compoundFrequency">
          <span className="label-text">Compound Frequency</span>
        </label>
        <select
          id="compoundFrequency"
          className="select select-bordered"
          value={formData.compoundFrequency}
          onChange={(e) =>
            setFormData({ ...formData, compoundFrequency: e.target.value })
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
        onClick={onCalculate}
      >
        Calculate
      </button>
    </form>
  );
} 