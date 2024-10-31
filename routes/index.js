const express = require("express")

const router = express.Router()

// Route grouping
router.use("/tasks", taskRoutes)

module.exports = router
