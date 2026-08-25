function formatMoney(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const balanceTone = balance >= 0 ? "is-positive" : "is-negative";

  return (
    <section className="summary" aria-label="Account summary">
      <div className={`balance-ribbon ${balanceTone}`}>
        <div className="balance-ribbon-main">
          <p className="summary-label">Available balance</p>
          <p className="balance-amount">{formatMoney(balance)}</p>
        </div>
        <div className="balance-ribbon-side">
          <div className="summary-metric">
            <p className="summary-label">Income</p>
            <p className="income-amount">{formatMoney(totalIncome)}</p>
          </div>
          <div className="summary-metric">
            <p className="summary-label">Expenses</p>
            <p className="expense-amount">{formatMoney(totalExpenses)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summary;
