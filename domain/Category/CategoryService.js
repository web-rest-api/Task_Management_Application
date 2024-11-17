const axios = require("axios")
const Category = require("./Category")
require("dotenv").config() // Load environment variables
const Observable = require("../../observable/Observable")

class CategoryService {
	constructor() {
		this.apiUrl = process.env.CATEGORY_SERVICE_URI // json-server URL for tasks
	}

	// Method to create a new category
	async createCategory(userId, name) {
		let thisUser
		const newCategory = new Category(userId, name)
		const response = await axios.post(this.apiUrl, newCategory)

		// Create an instance
		const observable = new Observable()

		const categorySubscriber = async (data) => {
			console.log("Subscriber 1 received:", data)
			try {
				thisUser = await axios.get(`${process.env.USER_SERVICE_URI}/${userId}`)
			} catch (error) {
				console.error(
					"Error updating user:",
					error.response?.data || error.message
				)
				throw new Error("Error with the user ID !")
			}
			const updatedUserData = { ...thisUser.data }
			updatedUserData.categories.push(data)

			try {
				const responseAddCategory = await axios.put(
					`${process.env.USER_SERVICE_URI}/${userId}`,
					updatedUserData
				)
				console.log("User updated successfully:", responseAddCategory.data)
			} catch (error) {
				console.error(
					"Error updating user:",
					error.response?.data || error.message
				)
				throw new Error("Error updating user ...")
			}
		}
		observable.subscribe(categorySubscriber)
		observable.notify(response.data.id)

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
