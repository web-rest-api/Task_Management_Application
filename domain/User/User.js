class User {
	constructor(id, username) {
		this.id = id
		this.username = username
		this.categories = [] // Array of category IDs owned by the user
	}

	// Method to add a category for this user
	addCategory(categoryId) {
		if (!this.categories.includes(categoryId)) {
			this.categories.push(categoryId)
		}
	}

	// Method to remove a category
	removeCategory(categoryId) {
		this.categories = this.categories.filter((id) => id !== categoryId)
	}
}

module.exports = User
