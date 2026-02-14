const authService = require("../services/authService"); 

exports.signup = async (req, res, next) => {
  try {
    const result = await authService.signupService(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.loginService(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotService(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetService(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
