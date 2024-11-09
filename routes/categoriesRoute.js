const express = require("express")
const CategoryService = require("../domain/Category/CategoryService")
const categoriesRoutes = express.Router()

// Initialize services
const categoriesService = new CategoryService()

categoriesRoutes.post("/", async (req, res) => {
	const { userId, name } = req.body

	try {
		const newCategory = await categoriesService.createCategory(userId, name)
		res.status(201).json(newCategory)
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating category:", error)
		res
			.status(500)
			.json({ error: "An error occurred while creating the category" })
	}

	//res.json({ msg: "categories post reached" })
})

module.exports = categoriesRoutes
