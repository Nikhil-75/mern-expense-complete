const Expense = require("../models/Expense");
const AppError = require("../utils/AppError");

exports.addExpenseService = async (userId, data) => {
  const expense = await Expense.create({ user: userId, ...data });
  return expense;
};

exports.getExpensesService = async (userId) => {
  return Expense.find({ user: userId }).sort({ createdAt: -1 });
};

exports.updateExpenseService = async (id, userId, data) => {
  const expense = await Expense.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true }
  );
  if (!expense) throw new AppError("Expense not found", 404);
  return expense;
};

exports.deleteExpenseService = async (id, userId) => {
  const expense = await Expense.findOneAndDelete({ _id: id, user: userId });
  if (!expense) throw new AppError("Expense not found", 404);
  return expense;
};
