const express = require("express")
const TaskService = require("../domain/Task/TaskService")
const { taskValidation } = require("../middleware/taskValidation")
const taskRoutes = express.Router()

// Initialize services
const taskService = new TaskService()

taskRoutes.post("/", taskValidation, async (req, res) => {
	const { userId, title, description, dueDate, priority } = req.newTaskData
	try {
		const newTask = await taskService.createTask(
			userId,
			title,
			description,
			dueDate,
			priority
		)

		res.status(201).json(newTask)
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating task:", error)
		res.status(500).json({ error: "An error occurred while creating the task" })
	}
})

module.exports = taskRoutes
