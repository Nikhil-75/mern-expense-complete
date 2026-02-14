import React, { useState, useEffect } from "react";
import { getExpenses, addExpense, updateExpense, deleteExpense } from "../services/expenseService";

function ExpenseRow({ e, onEdit, onDelete }) {
  return (
    <tr>
      <td className="py-4">{new Date(e.date).toLocaleDateString()}</td>
      <td>{e.title}</td> 
      <td>{e.category}</td>
      <td>₹{e.amount.toLocaleString()}</td>
      <td className="text-right space-x-2 pr-4">
        <button onClick={() => onEdit(e)} className="p-2 hover:bg-gray-100 rounded">✏️</button>
        <button onClick={() => onDelete(e._id)} className="p-2 hover:bg-gray-100 rounded">🗑️</button> 
      </td>
    </tr>
  );
}

export default function ExpensesPage() {
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", category: "", amount: "", date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchExpenses = async () => {
    const res = await getExpenses(); // ✅ backend fetch
    setList(res.data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...form,
      amount: Number(form.amount),
      date: form.date || new Date().toISOString().slice(0, 10),
    };

    await addExpense(data); // ✅ backend add
    setForm({ title: "", category: "", amount: "", date: "" });
    setShowModal(false);
    fetchExpenses(); // refresh list
    setCurrentPage(1);
  };

  const onEdit = async (item) => {
    const newTitle = prompt("Edit title:", item.title);
    const newCategory = prompt("Edit category:", item.category);
    const newAmount = parseFloat(prompt("Edit amount:", item.amount));
    if (!newTitle || !newCategory || isNaN(newAmount)) return;

    //fix
    await updateExpense(item._id, { title: newTitle, category: newCategory, amount: newAmount }); // ✅ backend update
    fetchExpenses();
  };

  //fix
  const onDelete = async (_id) => {
    if (window.confirm("Delete this expense?")) {
      await deleteExpense(_id); // ✅ backend delete
      fetchExpenses();
    }
  };

  const filtered = list.filter(
    (x) =>
      x.title.toLowerCase().includes(query.toLowerCase()) ||
      x.category.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          + Add Expense
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-96 space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">Add New Expense</h2>

            <input
              type="text" placeholder="Title" value={form.title} required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded focus:outline-primary"
            />
            <input
              type="text" placeholder="Category" value={form.category} required
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 border rounded focus:outline-primary"
            />
            <input
              type="number" placeholder="Amount" value={form.amount} required
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full p-2 border rounded focus:outline-primary"
            />
            <input
              type="date" value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 border rounded focus:outline-primary"
            />

            <div className="flex justify-end space-x-3 pt-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:opacity-90">Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl p-6 shadow-soft">
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
          placeholder="Search" className="w-full p-3 rounded-lg border border-gray-200"
        />

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-500">
              <tr>
                <th className="py-3">Date</th>
                <th className="py-3">Title</th>
                <th className="py-3">Category</th>
                <th className="py-3">Amount</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentExpenses.map((e) => (
                <ExpenseRow key={e._id} e={e} onEdit={onEdit} onDelete={onDelete} />
              ))}
              {currentExpenses.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No expenses found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
              ◀ Previous
            </button>
            <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
