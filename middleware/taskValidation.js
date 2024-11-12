require("dotenv").config() // Load environment variables
const Task = require("../domain/Task/Task")
const { validateRequiredFields } = require("../utils/validation")

exports.taskValidation = (req, res, next) => {
	try {
		// Destructure request body and validate required fields
		const { userId, title, description, dueDate, priority } = req.body

		// check empty for every field
		try {
			validateRequiredFields({ fieldName: "userId", value: userId })
			validateRequiredFields({ fieldName: "title", value: title })
			validateRequiredFields({ fieldName: "description", value: description })
			validateRequiredFields({ fieldName: "dueDate", value: dueDate })
			validateRequiredFields({ fieldName: "priority", value: priority })
		} catch (error) {
			// Handle the error response here
			console.error("Validation error:", error.message)
			return res.status(400).json({ error: error.message })
		}

		// type check && alphanumeric check
		const isAlphanumeric = (str) => /^[a-zA-Z0-9\s!?]+$/.test(str)
		// title
		if (typeof title !== "string" || !isAlphanumeric(title))
			return res.status(400).json({
				error: "Title must be a string with no weird characters !",
			})
		// // description (YYYY-MM-DD)
		if (typeof description !== "string" || !isAlphanumeric(title))
			return res.status(400).json({
				error: "Description must be a string",
			})
		// // date format
		if (isNaN(Date.parse(dueDate))) {
			return res.status(400).json({ error: "Invalid date format for dueDate" })
		}
		// // priority
		if (typeof priority !== "string" || !isAlphanumeric(title))
			return res.status(400).json({
				error: "Priority must be a string",
			})

		const newTaskData = new Task(userId, title, description, dueDate, priority)
		// pass data to the next middleware
		req.newTaskData = newTaskData
		next()
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating task:", error)
		res.status(500).json({ error: "An error occurred while creating the task" })
	}
}

exports.checkUserId = async (req, res, next) => {
	const { userId } = req.body
	const { title, description, dueDate, priority } = req.body

	const details = {
		userId,
		title,
		description,
		dueDate,
		priority,
	}

	try {
		await checkCategoryExists(userId)
		req.details = details
		next()
	} catch (error) {
		console.error("Error creating task:", error)
		res.status(500).json({ error: "An error occurred while finding user's id" })
	}
}

// Async function to check if email already exists
async function checkCategoryExists(userId) {
	try {
		const response = await fetch(`${process.env.USER_SERVICE_URI}/${userId}`)
		console.log(response.ok)
		if (!response.ok)
			throw new Error("Failed to check user's id in the database")
		//hello

		const data = await response.json()
		return data
	} catch (error) {
		console.error("Error:", error)
		throw new Error(
			error.message || "Failed to check user's id in the database"
		)
	}
}
