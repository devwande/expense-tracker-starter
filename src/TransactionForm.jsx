import { useState } from 'react'

function TransactionForm({ categories, onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = description.trim();
    const value = Number(amount);
    if (!trimmed || !Number.isFinite(value) || value <= 0) return;

    onAddTransaction({
      id: Date.now(),
      description: trimmed,
      amount: value,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="panel add-transaction">
      <div className="panel-header">
        <h2>Add transaction</h2>
        <p className="panel-lede">Log income or spending in one pass.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="field field-grow">
          <span>Description</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label className="field field-amount">
          <span>Amount</span>
          <input
            type="number"
            placeholder="0"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn-primary">Add transaction</button>
      </form>
    </section>
  );
}

export default TransactionForm;
