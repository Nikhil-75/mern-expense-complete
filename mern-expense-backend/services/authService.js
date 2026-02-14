const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.signupService = async (data) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const exists = await User.findOne({ email });
  if (exists) throw new AppError("Email already registered", 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: hashedPassword });
  return { message: "Signup successful!" };
};

exports.loginService = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    message: "Login successful!"
  };
};


exports.forgotService = async (data) => {
  const { email } = data;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("No account found with this email", 404);

  return { message: "Password reset link sent to your email ✅" };
};

exports.resetService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  return { message: "Password updated successfully ✅" };
};
