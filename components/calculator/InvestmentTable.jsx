export default function InvestmentTable({ results }) {
  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Year</th>
            <th>Contributions</th>
            <th>Profit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {results
            .filter((_, index) => index % 12 === 0)
            .map((result, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>${result.contributions.toLocaleString()}</td>
                <td>${result.profit.toLocaleString()}</td>
                <td>${result.balance.toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
} 