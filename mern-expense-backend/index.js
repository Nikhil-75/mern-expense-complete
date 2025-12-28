require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
const authRoutes = require("./routes/authRoutes");
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

// Error Middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
