const express = require("express")
const taskRoutes = require("./taskRoutes.js")
const userRoutes = require("./userRoutes.js")
const categoriesRoutes = require("./categoriesRoute.js")

const router = express.Router()

// Route grouping

router.use("/tasks", taskRoutes)
router.use("/users", userRoutes)
router.use("/categories", categoriesRoutes)


module.exports = router
