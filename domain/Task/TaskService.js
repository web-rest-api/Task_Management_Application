// src/domain/Task/TaskService.js
const axios = require("axios")

class TaskService {
	constructor() {
		this.apiUrl = "http://localhost:5000/tasks" // json-server URL for tasks
	}

	// Create a new task
	async createTask(title, description, dueDate, priority) {
		const task = {
			title,
			description,
			dueDate,
			priority,
			isComplete: false,
		}
		const response = await axios.post(this.apiUrl, task)
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
