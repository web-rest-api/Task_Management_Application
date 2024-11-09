const axios = require("axios")
const Category = require("./Category")
require("dotenv").config() // Load environment variables

class CategoryService {
	constructor() {
		this.apiUrl = process.env.CATEGORY_SERVICE_URI // json-server URL for tasks
	}

	// Method to create a new category
	async createCategory(userId, name) {
		const newCategory = new Category(userId, name)

		const response = await axios.post(this.apiUrl, newCategory)
		return response.data
	}

	// Get One task based oin the user's id
	async getCategoryByUserId(userId) {
		const response = await axios.get(`${this.apiUrl}?userId=${userId}`)
		return response.data
	}

	// Method to add a task to a category
	// async addTaskToCategory(categoryId, taskId) {
	// 	const category = this.categories.get(categoryId)
	// }
}

module.exports = CategoryService
