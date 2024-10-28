const Category = require("./Category")

class CategoryService {
	constructor() {
		this.categories = new Map() // Simulate database with a Map
	}

	// Method to create a new category
	createCategory(id, name) {
		const category = new Category(id, name)
		this.categories.set(id, category)
		return category
	}

	// Method to add a task to a category
	addTaskToCategory(categoryId, taskId) {
		const category = this.categories.get(categoryId)
		if (category) {
			category.addTask(taskId)
		}
	}
}

module.exports = CategoryService
