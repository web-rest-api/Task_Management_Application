class Task {
	constructor(
		id,
		title,
		description,
		dueDate,
		priority = "normal",
		isComplete = false
	) {
		this.id = id
		this.title = title
		this.description = description
		this.dueDate = dueDate
		this.priority = priority
		this.isComplete = isComplete
	}
}

module.exports = Task
