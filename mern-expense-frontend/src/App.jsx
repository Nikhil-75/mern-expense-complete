// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import ExpensesPage from "./pages/ExpensesPage";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Forgot from "./pages/ForgotPassword";

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/forgot" element={<Forgot />} />

//       <Route path="/" element={<Layout />}>
//         <Route index element={<Navigate to="/dashboard" replace />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="expenses" element={<ExpensesPage />} />
//         <Route path="reports" element={<Reports />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>

//       <Route path="*" element={<div className="p-8">Page not found</div>} />
//     </Routes>
//   );
// }

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ExpensesPage from "./pages/ExpensesPage";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgot from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";   // ✅ added
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/reset" element={<ResetPassword />} /> {/* ✅ added */}

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<div className="p-8">Page not found</div>} />
    </Routes>
  );
}

