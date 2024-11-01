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
// GET get all tasks
taskRoutes.get("/", async (req, res) => {
	try {
		const allTasks = await taskService.getAllTasks()
		res.json(allTasks)
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error getting all tasks:", error)
		res
			.status(500)
			.json({ error: "An error occurred while getting all the tasks" })
	}
})

// GET get one task based on the user's ID
taskRoutes.get("/:userId", async (req, res) => {
	const { userId } = req.params
	try {
		const allTasks = await taskService.getOneTaskById(userId)
		if (!allTasks.length)
			return res.status(404).json({ msg: "no tasks found with this ID..." })

		res.json(allTasks)
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error getting the tasks:", error)
		res
			.status(500)
			.json({ error: "An error occurred while getting all the tasks" })
	}
})

module.exports = taskRoutes
