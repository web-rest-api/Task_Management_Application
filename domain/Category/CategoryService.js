const axios = require("axios")
const Category = require("./Category")
require("dotenv").config() // Load environment variables

class CategoryService {
	constructor() {
		this.apiUrl = process.env.CATEGORY_SERVICE_URI // json-server URL for tasks
	}
}

module.exports = CategoryService
