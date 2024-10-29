class Task {
	constructor(title, description, dueDate, priority = "normal") {
		this.title = title
		this.description = description
		this.dueDate = dueDate
		this.priority = priority
		this.isComplete = false
	}

	/*
	// Method to mark a task as complete
	complete() {
		this.isComplete = true
	}

	// Method to update task details
	updateDetails({ title, description, dueDate, priority }) {
		if (title) this.title = title
		if (description) this.description = description
		if (dueDate) this.dueDate = dueDate
		if (priority) this.priority = priority
	}
	no es necesario ???
	*/
}

module.exports = Task
