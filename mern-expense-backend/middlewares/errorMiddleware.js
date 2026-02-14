module.exports = (err, req, res, next) => {
  console.error(err);


  
  // ✅ MONGOOSE INVALID OBJECT ID
  if (err.name === "CastError") {
    return res.status(404).json({
      message: "Expense not found"
    });
  }
  
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(err.errors).map(e => e.message).join(", ")
    });
  }

  // Duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value entered"
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
};
