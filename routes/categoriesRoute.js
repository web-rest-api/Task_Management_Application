const express = require("express")
const CategoryService = require("../domain/Category/CategoryService")
const categoriesRoutes = express.Router()

// Initialize services
const categoriesService = new CategoryService()

categoriesRoutes.post("/", (req, res) => {
	res.json({ msg: "categories post reached" })
})

module.exports = categoriesRoutes
