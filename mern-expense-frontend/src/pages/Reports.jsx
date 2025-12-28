// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const COLORS = ["#2f7ef6", "#22c55e", "#f97316", "#a78bfa"];

// export default function Reports() {
//   const [expenses, setExpenses] = useState([]);

//   useEffect(() => {
//     const saved = localStorage.getItem("expenses");
//     setExpenses(saved ? JSON.parse(saved) : []);
//   }, []);

//   // --- Line Chart Data (Monthly total) ---
//   const lineData = (() => {
//     const monthMap = {};
//     expenses.forEach((e) => {
//       const month = new Date(e.date).toLocaleString("default", { month: "short" });
//       monthMap[month] = (monthMap[month] || 0) + e.amount;
//     });
//     return Object.entries(monthMap).map(([month, value]) => ({ month, value }));
//   })();

//   // --- Pie Chart Data (Category total) ---
//   const pieData = (() => {
//     const categoryMap = {};
//     expenses.forEach((e) => {
//       categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
//     });
//     return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
//   })();

//   // --- Excel Download Function ---
//   const downloadExcel = () => {
//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.json_to_sheet(expenses);
//     XLSX.utils.book_append_sheet(wb, ws, "Expenses");
//     XLSX.writeFile(wb, "Expense_Report.xlsx");
//   };

//   // --- PDF Download Function ---
//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Expense Report", 14, 15);
//     const tableColumn = ["Date", "Title", "Category", "Amount"];
//     const tableRows = expenses.map((e) => [
//       e.date,
//       e.title,
//       e.category,
//       "₹" + e.amount.toLocaleString(),
//     ]);
//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 25,
//     });
//     doc.save("Expense_Report.pdf");
//   };

//   // --- Combined Download Handler ---
//   const handleDownload = () => {
//     const format = window.prompt("Enter format to download (excel/pdf):").toLowerCase();
//     if (format === "excel") downloadExcel();
//     else if (format === "pdf") downloadPDF();
//     else alert("Please enter either 'excel' or 'pdf'.");
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Reports</h1>
//         <button
//           onClick={handleDownload}
//           className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
//         >
//           Download
//         </button>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Line Chart Section */}
//         <div className="bg-white rounded-xl p-6 shadow-soft">
//           <h3 className="mb-4 font-semibold">Expenses over months</h3>
//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <LineChart data={lineData}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#2f7ef6"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pie Chart Section */}
//         <div className="bg-white rounded-xl p-6 shadow-soft">
//           <h3 className="mb-4 font-semibold">By Category</h3>
//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={90}
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Legend />
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const COLORS = ["#2f7ef6", "#22c55e", "#f97316", "#a78bfa"];

export default function Reports() {
  const [expenses, setExpenses] = useState([]);

  // ✅ Load reports based on logged-in user
  // useEffect(() => {
  //   const user = localStorage.getItem("fake_user");
  //   const saved = user ? localStorage.getItem(`expenses_${user}`) : null;

  //   setExpenses(saved ? JSON.parse(saved) : []);
  // }, []);

  useEffect(() => {
  const user = localStorage.getItem("fake_user");
  const saved = localStorage.getItem(`expenses_${user}`);
  setExpenses(saved ? JSON.parse(saved) : []);
}, []);


  // --- Line Chart Data (Monthly total) ---
  const lineData = (() => {
    const monthMap = {};
    expenses.forEach((e) => {
      const month = new Date(e.date).toLocaleString("default", { month: "short" });
      monthMap[month] = (monthMap[month] || 0) + e.amount;
    });
    return Object.entries(monthMap).map(([month, value]) => ({ month, value }));
  })();

  // --- Pie Chart Data (Category total) ---
  const pieData = (() => {
    const categoryMap = {};
    expenses.forEach((e) => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  })();

  // --- Excel Download Function ---
  const downloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(expenses);
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    XLSX.writeFile(wb, "Expense_Report.xlsx");
  };

  // --- PDF Download Function ---
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 14, 15);
    const tableColumn = ["Date", "Title", "Category", "Amount"];
    const tableRows = expenses.map((e) => [
      e.date,
      e.title,
      e.category,
      e.amount,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("Expense_Report.pdf");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>

      {/* --- Line Chart --- */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-xl font-semibold mb-4">Monthly Expense Trend</h2>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2f7ef6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Pie Chart --- */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- Buttons --- */}
      <div className="flex gap-4">
        <button
          onClick={downloadExcel}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
        >
          Download Excel
        </button>

        <button
          onClick={downloadPDF}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
