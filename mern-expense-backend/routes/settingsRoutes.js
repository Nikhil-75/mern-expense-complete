const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const settingsController = require("../controllers/settingsController");

//All routes protected
router.use(authMiddleware);

// GET settings
router.get("/", settingsController.getSettings);

// PATCH update settings
router.patch("/", settingsController.updateSettings);

// PATCH change password
router.patch("/password", settingsController.changePassword);

module.exports = router;
