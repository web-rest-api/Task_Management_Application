const express = require("express")
const taskRoutes = require("./taskRoutes.js")

const router = express.Router()

// Route grouping
router.use("/tasks", taskRoutes)

module.exports = router
