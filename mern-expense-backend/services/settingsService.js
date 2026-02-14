const UserSettings = require("../models/UserSettings");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");

exports.getSettingsService = async (userId) => {
  let settings = await UserSettings.findOne({ user: userId });

  if (!settings) {
    settings = await UserSettings.create({ user: userId });
  }

  return settings;
};

exports.updateSettingsService = async (userId, data) => {
  const { name, email, language, notifications } = data;

  let settings = await UserSettings.findOne({ user: userId });
  if (!settings) settings = new UserSettings({ user: userId });

  if (name !== undefined) settings.name = name;
  if (email !== undefined) settings.email = email;
  if (language !== undefined) settings.language = language;
  if (typeof notifications === "boolean")
    settings.notifications = notifications;

  await settings.save();
  return settings;
};

exports.changePasswordService = async (
  userId,
  currentPassword,
  newPassword
) => {
  if (!currentPassword || !newPassword) {
    throw new AppError("Both current and new password are required", 400);
  }

  const user = await User.findById(userId).select("+password");
  if (!user) throw new AppError("User not found", 404);

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new AppError("Current password incorrect", 401);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return { message: "Password updated successfully ✅" };
};
