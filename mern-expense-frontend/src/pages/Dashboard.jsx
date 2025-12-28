import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [list, setList] = useState(() => {
    const user = localStorage.getItem("fake_user");
    const saved = user ? localStorage.getItem(`expenses_${user}`) : null;

    return saved ? JSON.parse(saved) : [];
  });

  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const calculateSummary = (listData) => {
    const totalAmt = listData.reduce((s, e) => s + e.amount, 0);
    setTotal(totalAmt);

    const categoryMap = {};
    listData.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });

    const chartData = Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
    setData(chartData);
  };

  useEffect(() => {
    calculateSummary(list);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      const user = localStorage.getItem("fake_user");
      const updated = JSON.parse(localStorage.getItem(`expenses_${user}`)) || [];

      setList(updated);
      calculateSummary(updated);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Total Expense */}
        <div className="bg-white rounded-xl p-6 shadow-soft">
          <div className="text-sm text-gray-500">Total Expense</div>
          <div className="text-3xl font-semibold mt-2">₹{total.toLocaleString()}</div>
        </div>

        {/* Expense by Category */}
        <div className="bg-white rounded-xl p-6 shadow-soft">
          <h3 className="font-semibold mb-4">Expenses by Category</h3>
          <div style={{ width: "100%", height: 150 }}>
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2f7ef6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 shadow-soft">
        <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-gray-500">
              <tr>
                <th className="py-3">Date</th>
                <th className="py-3">Title</th>
                <th className="py-3">Category</th>
                <th className="py-3">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[...list]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 4)
                .map((e, idx) => (
                  <tr key={idx}>
                    <td className="py-4">{e.date}</td>
                    <td>{e.title}</td>
                    <td>{e.category}</td>
                    <td>₹{e.amount.toLocaleString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
