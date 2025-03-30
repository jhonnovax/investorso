export default function InvestmentTable({ years, results }) {

  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th className="p-2 md:p-4">{ years > 1 ? "Year" : "Month" }</th>
            <th className="p-2 md:p-4"><span className="hidden md:inline">Net</span> Deposits</th>
            <th className="p-2 md:p-4">Simple <span className="hidden md:inline">Interest</span><span className="inline md:hidden">%</span></th>
            <th className="p-2 md:p-4">Compound <span className="hidden md:inline">Interest</span><span className="inline md:hidden">%</span></th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td className="p-2 md:p-4">{result.period}</td>
              <td className="p-2 md:p-4">${result.contributions.toLocaleString()}</td>
              <td className="p-2 md:p-4">${result.simpleInterest.toLocaleString()}</td>
              <td className="p-2 md:p-4">${result.compoundInterest.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 