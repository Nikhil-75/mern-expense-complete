import React, { useState, useEffect } from "react";
import API from "../utils/api";

export default function Settings() {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    language: "English",
    notifications: true,
  });

  const [showModal, setShowModal] = useState(null);
  const [form, setForm] = useState({});

  // Fetch settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get("/settings");
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error("Failed to fetch settings", err);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      let updatedSettings = { ...settings };

      // PROFILE
      if (showModal === "profile") {
        updatedSettings.name = form.name;
        updatedSettings.email = form.email;

        await API.put("/settings", updatedSettings);
        setSettings(updatedSettings);
      }

      // PASSWORD (FIXED ✅)
      else if (showModal === "password") {
        if (!form.currentPassword || !form.newPassword || !form.confirm) {
          alert("All fields are required");
          return;
        }

        if (form.newPassword !== form.confirm) {
          alert("Passwords do not match");
          return;
        }

        await API.put("/settings/password", {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        });

        alert("Password changed successfully ✅");
      }

      // NOTIFICATIONS
      else if (showModal === "notifications") {
        updatedSettings.notifications = form.notifications;

        await API.put("/settings", updatedSettings);
        setSettings(updatedSettings);
      }

      // LANGUAGE
      else if (showModal === "language") {
        updatedSettings.language = form.language;

        await API.put("/settings", updatedSettings);
        setSettings(updatedSettings);
      }

      setShowModal(null);
      setForm({});
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save settings ❌");
    }
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
              <div className="text-sm text-gray-500">
                Change your account password
              </div>
            </div>
            <button
              onClick={() => {
                setShowModal("password");
                setForm({});
              }}
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
              <div className="text-sm text-gray-500">
                {settings.language}
              </div>
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold">
              {showModal === "profile" && "Edit Profile"}
              {showModal === "password" && "Change Password"}
              {showModal === "notifications" && "Notifications"}
              {showModal === "language" && "Select Language"}
            </h2>

            {/* Profile */}
            {showModal === "profile" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name || ""}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email || ""}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </>
            )}

            {/* Password (FIXED ✅) */}
            {showModal === "password" && (
              <>
                <input
                  type="password"
                  placeholder="Current Password"
                  onChange={(e) =>
                    setForm({ ...form, currentPassword: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  onChange={(e) =>
                    setForm({ ...form, newPassword: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </>
            )}

            {/* Notifications */}
            {showModal === "notifications" && (
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={form.notifications}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      notifications: e.target.checked,
                    })
                  }
                />
                <label>Enable notifications</label>
              </div>
            )}

            {/* Language */}
            {showModal === "language" && (
              <select
                value={form.language}
                onChange={(e) =>
                  setForm({ ...form, language: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-3">
              <button
                onClick={() => setShowModal(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-primary text-white px-4 py-2 rounded"
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
