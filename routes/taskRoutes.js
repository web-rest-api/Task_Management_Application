const express = require("express")
const TaskService = require("../domain/Task/TaskService")
const taskRoutes = express.Router()

// Initialize services
const taskService = new TaskService()

taskRoutes.post("/", async (req, res) => {
	// Create a new Task instance directly from req.body

	try {
		// Destructure request body and validate required fields
		const { title, description, dueDate, priority } = req.body

		if (!title || !description || !dueDate || !priority) {
			// Respond with a 400 Bad Request if any required field is missing
			return res.status(400).json({
				error: "All fields are required: title, description, dueDate, priority",
			})
		}

		const newTask = await taskService.createTask(
			title,
			description,
			dueDate,
			priority
		)
		// const newTask = new Task(title, description, dueDate, priority, false)

		res.status(201).json(newTask)

		// Validate date format for dueDate if needed
		// if (isNaN(Date.parse(dueDate))) {
		// 	return res.status(400).json({ error: "Invalid date format for dueDate" });
		// }
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating task:", error)
		res.status(500).json({ error: "An error occurred while creating the task" })
	}
})

module.exports = taskRoutes
