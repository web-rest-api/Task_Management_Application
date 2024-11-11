const express = require("express")
const TaskService = require("../domain/Task/TaskService")
const { taskValidation, checkUserId } = require("../middleware/taskValidation")
const taskRoutes = express.Router()

// Initialize services
const taskService = new TaskService()

// POST create a new task
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

// PUT update a task based on its id
taskRoutes.put("/:taskId", checkUserId, async (req, res) => {
	const { taskId } = req.params

	const details = req.details

	console.log(details)

	// taskService.updateTask(taskId, details)
	res.json({ msg: "patch reached " + taskId })
})

// DELETE delete a task by id
taskRoutes.delete("/:taskId", checkUserId, async (req, res) => {
	const { taskId } = req.params
	try {
		console.log(taskId)
		const allTasks = await taskService.deleteTask(taskId)
		res.json({ msg: allTasks })
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		res.status(error.status).json({ error: error.message })
	}
})

module.exports = taskRoutes
