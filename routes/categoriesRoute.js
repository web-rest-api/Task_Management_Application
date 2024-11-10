const express = require("express")
const CategoryService = require("../domain/Category/CategoryService")
const { categoryValidation } = require("../middleware/categoriesValidation")
const categoriesRoutes = express.Router()

// Initialize services
const categoriesService = new CategoryService()

// create a new category with normalized values and making sure the user doesn't have this category already
categoriesRoutes.post("/", categoryValidation, async (req, res) => {
	const { userId, name } = req.validData

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
})

// GET get one task based on the user's ID
categoriesRoutes.get("/:userId", async (req, res) => {
	const { userId } = req.params
	try {
		const allCategories = await categoriesService.getCategoryByUserId(userId)
		if (!allCategories.length)
			return res
				.status(404)
				.json({ msg: "no categories found with this ID..." })

		res.json(allCategories)
	} catch (error) {}
})

module.exports = categoriesRoutes
