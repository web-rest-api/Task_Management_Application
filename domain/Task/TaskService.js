const axios = require("axios")
const Task = require("./Task")
require("dotenv").config() // Load environment variables

class TaskService {
	constructor() {
		this.apiUrl = process.env.TASK_SERVICE_URI // json-server URL for tasks
	}

	// Create a new task
	async createTask(title, description, dueDate, priority) {
		const newTask = new Task(title, description, dueDate, priority)
		const response = await axios.post(this.apiUrl, newTask)
		return response.data
	}

	// Complete a task
	async completeTask(taskId) {
		const response = await axios.patch(`${this.apiUrl}/${taskId}`, {
			isComplete: true,
		})
		return response.data
	}

	// Update task details
	async updateTask(taskId, details) {
		const response = await axios.patch(`${this.apiUrl}/${taskId}`, details)
		return response.data
	}
}

module.exports = TaskService
