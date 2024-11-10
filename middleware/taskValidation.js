require("dotenv").config() // Load environment variables
const Task = require("../domain/Task/Task")

exports.taskValidation = (req, res, next) => {
	try {
		// Destructure request body and validate required fields
		const { userId, title, description, dueDate, priority } = req.body

		// not empty
		if (!userId || !title || !description || !dueDate || !priority) {
			// Respond with a 400 Bad Request if any required field is missing
			return res.status(400).json({
				error:
					"All fields are required: userId, title, description, dueDate, priority",
			})
		}

		// type check
		// alphanumeric check
		const isAlphanumeric = (str) => /^[a-zA-Z0-9\s!?]+$/.test(str)
		// title
		if (typeof title !== "string" || !isAlphanumeric(title))
			return res.status(400).json({
				error: "Title must be a string with no weird characters !",
			})
		// description (YYYY-MM-DD)
		if (typeof description !== "string")
			return res.status(400).json({
				error: "Description must be a string",
			})
		// date format
		if (isNaN(Date.parse(dueDate))) {
			return res.status(400).json({ error: "Invalid date format for dueDate" })
		}
		// priority
		if (typeof priority !== "string")
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
		await checkEmailExists(userId)
		req.details = details
		next()
	} catch (error) {
		console.error("Error creating task:", error)
		res
			.status(500)
			.json({ error: "An error occurred while creating the category ..." })
	}
}

// Async function to check if email already exists
async function checkEmailExists(userId) {
	try {
		const response = await fetch(`${process.env.USER_SERVICE_URI}/${userId}`)
		console.log(response.ok)
		if (!response.ok) throw new Error("Failed to check email in the database")

		const data = await response.json()
		return data

		// console.log(data)

		// if (data.length > 0) {
		// 	throw new Error("Email already exists in the database!")
		// }
	} catch (error) {
		console.error("Error:", error)
		throw new Error(error.message || "Failed to check email in the database")
	}
}
