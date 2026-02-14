require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middlewarenpm
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/settings", settingsRoutes);
// Error Middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
