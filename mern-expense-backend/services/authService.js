const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signupService = async (data) => {
  const { name, email, password } = data;

  const exists = await User.findOne({ email });
  if (exists) throw new Error("Email already registered!");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });
  return { message: "Signup successful!" };
};

exports.loginService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password!");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid email or password!");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return { token, message: "Login successful!" };
};

exports.forgotService = async (data) => {
  const { email } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("No account found!");

  // Simulate sending email
  return { message: "Password reset link sent to your email ✅" };
};

exports.resetService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("No user found!");

  user.password = await bcrypt.hash(password, 10);
  await user.save();

  return { message: "Password updated successfully ✅" };
};
