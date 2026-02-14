const settingsService = require("../services/settingsService");
const AppError = require("../utils/AppError");

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsService(req.user._id);
    res.status(200).json(settings);
  } catch (err) {
    next(err);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const { name, email, language, notifications } = req.body;

    const errors = [];

    if (name !== undefined && name.trim() === "")
      errors.push("name is required");

    if (email !== undefined && email.trim() === "")
      errors.push("email is required");

    if (
      language !== undefined &&
      !["English", "Hindi"].includes(language)
    )
      errors.push("language must be English or Hindi");

    if (errors.length > 0) {
      throw new AppError(errors.join(", "), 400);
    }

    const settings = await settingsService.updateSettingsService(
      req.user._id,
      req.body
    );

    res.status(200).json(settings);
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const result = await settingsService.changePasswordService(
      req.user._id,
      currentPassword,
      newPassword
    );

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
