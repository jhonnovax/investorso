export default function InvestmentTable({ years, results }) {

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>{ years > 1 ? "Year" : "Month" }</th>
            <th><span className="hidden md:inline">Net</span> Deposits</th>
            <th>Simple <span className="hidden md:inline">Interest</span><span className="inline md:hidden">%</span></th>
            <th>Compound <span className="hidden md:inline">Interest</span><span className="inline md:hidden">%</span></th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.period}</td>
              <td>${result.contributions.toLocaleString()}</td>
              <td>${result.simpleInterest.toLocaleString()}</td>
              <td>${result.compoundInterest.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 