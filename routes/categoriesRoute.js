const express = require("express")
const CategoryService = require("../domain/Category/CategoryService")
const categoriesRoutes = express.Router()

// Initialize services
const categoriesService = new CategoryService()

// ❗ add validation milddleware is user and category name exists (no repeats) use lowercase ! ❗
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
