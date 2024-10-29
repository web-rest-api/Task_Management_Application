const Task = require("../domain/Task/Task")

exports.taskValidation = (req, res, next) => {
	try {
		// Destructure request body and validate required fields
		const { title, description, dueDate, priority } = req.body

		if (!title || !description || !dueDate || !priority) {
			// Respond with a 400 Bad Request if any required field is missing
			return res.status(400).json({
				error: "All fields are required: title, description, dueDate, priority",
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

		const newTaskData = new Task(title, description, dueDate, priority)
		req.newTaskData = newTaskData
		req.userId = "12345" // Add userId to req object
		next()
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating task:", error)
		res.status(500).json({ error: "An error occurred while creating the task" })
	}
}
