import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function SpendingChart({ transactions }) {
  const chartData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      const existing = acc.find(item => item.category === t.category);
      if (existing) {
        existing.amount += t.amount;
      } else {
        acc.push({ category: t.category, amount: t.amount });
      }
      return acc;
    }, [])
    .sort((a, b) => b.amount - a.amount);

  if (chartData.length === 0) {
    return (
      <div className="spending-chart">
        <h2>Spending by Category</h2>
        <p className="chart-empty">No expenses to display.</p>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Spent"]} />
          <Bar dataKey="amount" fill="#e74c3c" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
