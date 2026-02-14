const expenseService = require("../services/expenseService");
const AppError = require("../utils/AppError");

exports.addExpense = async (req, res, next) => {
  try {
    const { title, category, amount, date } = req.body;

    // ✅ Custom validation (CLEAN RESPONSE)
    const errors = [];

    if (!title || title.trim() === "") errors.push("title is required");
    if (!category || category.trim() === "") errors.push("category is required");
    if (amount === undefined || amount === null)
      errors.push("amount is required");
    if (!date) errors.push("date is required");

     // ❌ If validation failed
    if (errors.length > 0) {
      throw new AppError(errors.join(", "), 400);
    }

     // ✅ Create expense
    const expense = await expenseService.addExpenseService(
      req.user._id,
      req.body
    );

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const expenses = await expenseService.getExpensesService(req.user._id);
    res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const { title, category, amount, date } = req.body;

    // ✅ VALIDATE ONLY PROVIDED FIELDS (PATCH LOGIC)
    const errors = [];

    if (title !== undefined && title.trim() === "")
      errors.push("title is required");

    if (category !== undefined && category.trim() === "")
      errors.push("category is required");

    if (amount !== undefined && amount === null)
      errors.push("amount is required");

    if (date !== undefined && !date)
      errors.push("date is required");

    if (errors.length > 0) {
      throw new AppError(errors.join(", "), 400);
    }

    const expense = await expenseService.updateExpenseService(
      req.params.id,
      req.user._id,
      req.body
    );

    res.status(200).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    await expenseService.deleteExpenseService(
      req.params.id,
      req.user._id
    );
      res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
 