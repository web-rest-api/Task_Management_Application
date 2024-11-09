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
		console.log(newCategory)

		const response = await axios.post(this.apiUrl, newCategory)
		return response.data
	}
}

module.exports = CategoryService
