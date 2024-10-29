// src/routes/index.js
const express = require("express")
const taskRoutes = require("./tasks")

const router = express.Router()

// Route grouping
router.use("/tasks", taskRoutes)

// You can add other route groups like `users`, `categories` here if needed
// router.use("/users", userRoutes);

module.exports = router
