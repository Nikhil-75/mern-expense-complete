import React, { useState, useEffect } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    language: "English",
    notifications: true,
  });

  const [showModal, setShowModal] = useState(null); // "profile", "password", "notifications", "language"
  const [form, setForm] = useState({});

  // Load saved settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  // Save settings to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  }, [settings]);

  const handleSave = () => {
    if (showModal === "profile") {
      setSettings({ ...settings, name: form.name, email: form.email });
    } else if (showModal === "password") {
      alert("Password changed successfully ✅");
    } else if (showModal === "notifications") {
      setSettings({ ...settings, notifications: form.notifications });
    } else if (showModal === "language") {
      setSettings({ ...settings, language: form.language });
    }
    setShowModal(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white rounded-xl p-6 shadow-soft max-w-3xl">
        <ul className="space-y-4">
          {/* Profile */}
          <li className="flex justify-between items-center">
            <div>
              <div className="font-medium">Profile</div>
              <div className="text-sm text-gray-500">
                {settings.name || "Your Name"} – {settings.email || "Your Email"}
              </div>
            </div>
            <button
              onClick={() => {
                setShowModal("profile");
                setForm({ name: settings.name, email: settings.email });
              }}
              className="px-3 py-1.5 border rounded text-primary hover:bg-gray-50"
            >
              Edit
            </button>
          </li>

          {/* Password */}
          <li className="flex justify-between items-center">
            <div>
              <div className="font-medium">Password</div>
              <div className="text-sm text-gray-500">Change your account password</div>
            </div>
            <button
              onClick={() => setShowModal("password")}
              className="px-3 py-1.5 border rounded hover:bg-gray-50"
            >
              Edit
            </button>
          </li>

          {/* Notifications */}
          <li className="flex justify-between items-center">
            <div>
              <div className="font-medium">Notifications</div>
              <div className="text-sm text-gray-500">
                {settings.notifications ? "Enabled" : "Disabled"}
              </div>
            </div>
            <button
              onClick={() => {
                setShowModal("notifications");
                setForm({ notifications: settings.notifications });
              }}
              className="px-3 py-1.5 border rounded hover:bg-gray-50"
            >
              Edit
            </button>
          </li>

          {/* Language */}
          <li className="flex justify-between items-center">
            <div>
              <div className="font-medium">Language</div>
              <div className="text-sm text-gray-500">{settings.language}</div>
            </div>
            <button
              onClick={() => {
                setShowModal("language");
                setForm({ language: settings.language });
              }}
              className="px-3 py-1.5 border rounded hover:bg-gray-50"
            >
              Edit
            </button>
          </li>
        </ul>
      </div>

      {/* === Modal === */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold">
              {showModal === "profile" && "Edit Profile"}
              {showModal === "password" && "Change Password"}
              {showModal === "notifications" && "Notifications"}
              {showModal === "language" && "Select Language"}
            </h2>

            {/* Modal Content */}
            {showModal === "profile" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-primary"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-primary"
                />
              </>
            )}

            {showModal === "password" && (
              <>
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-primary"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  className="w-full p-2 border rounded focus:outline-primary"
                />
              </>
            )}

            {showModal === "notifications" && (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={form.notifications}
                  onChange={(e) =>
                    setForm({ ...form, notifications: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label className="text-gray-700">Enable notifications</label>
              </div>
            )}

            {showModal === "language" && (
              <select
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
                className="w-full p-2 border rounded focus:outline-primary"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            )}

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 pt-3">
              <button
                onClick={() => setShowModal(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-primary text-white px-4 py-2 rounded hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
