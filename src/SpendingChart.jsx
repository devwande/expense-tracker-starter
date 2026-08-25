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
      <section className="panel spending-chart">
        <div className="panel-header">
          <h2>Spending by category</h2>
          <p className="panel-lede">Where expenses concentrate this period.</p>
        </div>
        <p className="empty-state">No expenses to display yet. Add a spending entry to see the chart.</p>
      </section>
    );
  }

  return (
    <section className="panel spending-chart">
      <div className="panel-header">
        <h2>Spending by category</h2>
        <p className="panel-lede">Where expenses concentrate this period.</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="var(--line-soft)" strokeDasharray="4 6" vertical={false} />
          <XAxis
            dataKey="category"
            tick={{ fill: "var(--ink-muted)", fontSize: 12, fontFamily: "var(--font-body)" }}
            axisLine={{ stroke: "var(--line)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--ink-muted)", fontSize: 12, fontFamily: "var(--font-mono)" }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            cursor={{ fill: "rgba(13, 115, 119, 0.06)" }}
            contentStyle={{
              background: "var(--surface-raised)",
              border: "1px solid var(--line)",
              borderRadius: 8,
              boxShadow: "var(--shadow)",
              fontFamily: "var(--font-body)",
            }}
            labelStyle={{ color: "var(--ink)", fontWeight: 600 }}
            formatter={(value) => [
              `$${Number(value).toLocaleString("en-US")}`,
              "Spent",
            ]}
          />
          <Bar dataKey="amount" fill="var(--coral)" radius={[6, 6, 0, 0]} barSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default SpendingChart;
