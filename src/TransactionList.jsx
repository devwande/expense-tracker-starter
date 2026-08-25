import { useState } from 'react'

function formatMoney(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

function TransactionList({ transactions, categories, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  const handleDelete = (transaction) => {
    const confirmed = window.confirm(
      `Delete "${transaction.description}" (${formatMoney(transaction.amount)})?`
    );
    if (confirmed) {
      onDeleteTransaction(transaction.id);
    }
  };

  return (
    <section className="panel transactions">
      <div className="panel-header panel-header-row">
        <div>
          <h2>Transactions</h2>
          <p className="panel-lede">Filter the ledger without losing the trail.</p>
        </div>
        <div className="filters">
          <label className="field field-compact">
            <span className="visually-hidden">Type</span>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label className="field field-compact">
            <span className="visually-hidden">Category</span>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="empty-state">No transactions match these filters. Clear a filter to see more.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td className="cell-date">{t.date}</td>
                  <td className="cell-desc">{t.description}</td>
                  <td>
                    <span className="category-chip">{t.category}</span>
                  </td>
                  <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                    {t.type === "income" ? "+" : "−"}{formatMoney(t.amount)}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(t)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TransactionList;
