import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const SidebarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-primary text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-primary"
      }`
    }
  >
    <span>{children}</span>
  </NavLink>
);

export default function Layout() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("fake_user");

  const handleLogout = () => {
    localStorage.removeItem("fake_user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white p-6 hidden md:block rounded-tr-2xl rounded-br-2xl">
        <div className="mb-8">
          <div className="text-xl font-semibold">Expense Tracker</div>
        </div>
        <nav className="space-y-2">
          <SidebarLink to="/dashboard">Dashboard</SidebarLink>
          <SidebarLink to="/expenses">Expenses</SidebarLink>
          <SidebarLink to="/reports">Reports</SidebarLink>
          <SidebarLink to="/settings">Settings</SidebarLink>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1">
        <header className="flex items-center justify-between p-4 md:p-6 bg-white shadow-soft">
          <div className="md:hidden">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-primary font-semibold"
            >
              Expense Tracker
            </button>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-white border text-primary hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-lg bg-white border text-primary"
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </header>

        <main className="p-6 md:p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
