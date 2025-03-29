"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "@/components/Header";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    calculateCompoundInterest()
  }, []);

  const [formData, setFormData] = useState({
    initialInvestment: 0,
    monthlyContribution: 833,
    years: 30,
    interestRate: 7,
    interestRateVariance: 2,
    compoundFrequency: "annually",
  });

  const [results, setResults] = useState([]);

  const compoundFrequencies = {
    annually: 1,
    semiannually: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };

  function calculateCompoundInterest() {
    const {
      initialInvestment,
      monthlyContribution,
      years,
      interestRate,
      interestRateVariance,
      compoundFrequency,
    } = formData;

    const frequency = compoundFrequencies[compoundFrequency];
    const monthlyRate = interestRate / 100 / 12;
    const monthlyVariance = interestRateVariance / 100 / 12;
    const totalMonths = years * 12;
    const data = [];

    let balance = initialInvestment;
    let totalContributions = initialInvestment;

    for (let month = 0; month <= totalMonths; month++) {
      const randomVariance = (Math.random() - 0.5) * monthlyVariance * 2;
      const effectiveRate = monthlyRate + randomVariance;
      
      if (month > 0) {
        balance = balance * (1 + effectiveRate) + monthlyContribution;
        totalContributions += monthlyContribution;
      }

      data.push({
        month,
        balance: Math.round(balance),
        contributions: Math.round(totalContributions),
        profit: Math.round(balance - totalContributions),
      });
    }

    setResults(data);
  }

  const CalculatorForm = () => (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Initial Investment ($)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.initialInvestment}
          onChange={(e) =>
            setFormData({ ...formData, initialInvestment: Number(e.target.value) })
          }
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
          onChange={(e) =>
            setFormData({ ...formData, monthlyContribution: Number(e.target.value) })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Length of Time (Years)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.years}
          onChange={(e) =>
            setFormData({ ...formData, years: Number(e.target.value) })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Estimated Interest Rate (%)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.interestRate}
          onChange={(e) =>
            setFormData({ ...formData, interestRate: Number(e.target.value) })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Interest Rate Variance Range (%)</span>
        </label>
        <input
          type="number"
          className="input input-bordered"
          value={formData.interestRateVariance}
          onChange={(e) =>
            setFormData({ ...formData, interestRateVariance: Number(e.target.value) })
          }
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Compound Frequency</span>
        </label>
        <select
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
        className="btn btn-primary w-full mt-6"
        onClick={calculateCompoundInterest}
      >
        Calculate
      </button>
    </div>
  );

  // Custom content for the Header's mobile drawer
  const mobileDrawerContent = (
    <>
      <div className="py-4">
        <CalculatorForm />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-base-200">
      <Header 
        links={[]} // Empty array to remove default links
        cta={null} // Remove default CTA
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileContent={mobileDrawerContent}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Chart and Table */}
          <div className="lg:col-span-2 space-y-8">
            {results.length > 0 && (
              <>
                <div className="bg-base-100 p-4 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-4">Investment Growth</h2>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="balance" 
                          stroke="#8884d8" 
                          name="Total Balance"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="contributions" 
                          stroke="#82ca9d" 
                          name="Total Contributions"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="#ffc658" 
                          name="Total Profit"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-base-100 p-4 rounded-lg shadow-sm overflow-x-auto">
                  <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Balance</th>
                        <th>Contributions</th>
                        <th>Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results
                        .filter((_, index) => index % 12 === 0)
                        .map((result, index) => (
                          <tr key={index}>
                            <td>{index}</td>
                            <td>${result.balance.toLocaleString()}</td>
                            <td>${result.contributions.toLocaleString()}</td>
                            <td>${result.profit.toLocaleString()}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>

          {/* Right side - Input Form - Now hidden on mobile */}
          <div className="hidden lg:block lg:sticky lg:top-8 self-start h-[calc(100vh-6rem)] overflow-y-auto bg-base-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Calculator Parameters</h2>
            <CalculatorForm />
          </div>
        </div>
      </main>
    </div>
  );
}
