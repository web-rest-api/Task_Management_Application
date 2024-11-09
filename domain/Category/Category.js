class Category {
	constructor(userId, name) {
		this.userId = userId
		this.name = name
		this.tasks = [] // Array of task IDs belonging to this category
	}

	// Method to add a task to this category
	addTask(taskId) {
		if (!this.tasks.includes(taskId)) {
			this.tasks.push(taskId)
		}
	}

	// Method to remove a task from this category
	removeTask(taskId) {
		this.tasks = this.tasks.filter((id) => id !== taskId)
	}
}

module.exports = Category
