"use client";

export default function CalculatorForm({ formData, setFormData, onCalculate }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleNumberInput(e, field) {
    const value = e.target.value;
    setFormData({
      ...formData,
      [field]: value === '' ? '' : Number(value)
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Initial Investment ($)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.initialInvestment}
          onChange={(e) => handleNumberInput(e, 'initialInvestment')}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Monthly Contribution ($)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.monthlyContribution}
          onChange={(e) => handleNumberInput(e, 'monthlyContribution')}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Length of Time in Years</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.years}
          onChange={(e) => handleNumberInput(e, 'years')}
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Estimated Annual Interest Rate (%)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.interestRate}
          onChange={(e) => handleNumberInput(e, 'interestRate')}
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