require("dotenv").config() // Load environment variables
const {
	validateRequiredFields,
	isStringAlphanumeric,
	checkEmailExists,
	checkUserIdExists,
} = require("../utils/validation.js")

exports.categoryValidation = async (req, res, next) => {
	try {
		// Destructure request body and validate required fields
		const { userId, name, email } = req.body

		console.log(userId, name, email)

		// check empty
		try {
			validateRequiredFields({ fieldName: "name", value: name })
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}
		// check type
		try {
			isStringAlphanumeric({ fieldName: "name", value: name })
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}
		// check if the we can add a category for a non existent user
		try {
			const registeredUser = await checkEmailExists(email)
			if (!registeredUser.length)
				return res
					.status(400)
					.json({ error: "We cannot create a category for this user" })
		} catch (error) {
			// Handle the error if the email already exists
			return res.status(400).json({ error: error.message })
		}

		// check if the user's id exists in our db
		try {
			const checkedUserId = await checkUserIdExists(userId)
			console.log(checkedUserId)

			if (!checkedUserId)
				return res
					.status(400)
					.json({ error: "We cannot create a category for this user" })
		} catch (error) {
			// Handle the error for suer's id check
			return res.status(400).json({ error: error.message })
		}

		// Check if category already exists for this user
		try {
			await checkRepeatedCategory(userId, name)
		} catch (error) {
			// Handle the error if the email already exists
			return res.status(400).json({ error: error.message })
		}

		const validData = {
			userId,
			name: normalizeString(name),
		}
		req.validData = validData
		next()
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating category:", error)
		res
			.status(500)
			.json({ error: "An error occurred while creating the category" })
	}
}

// Async function to check if user already has this category
async function checkRepeatedCategory(userId, name) {
	try {
		const response = await fetch(
			`${
				process.env.CATEGORY_SERVICE_URI
			}?userId=${userId}&name=${normalizeString(name)}`
		)
		const data = await response.json()

		if (data.length > 0) {
			throw new Error(
				`You already have this category ! - Category: ${normalizeString(name)}`
			)
		}
		return data
	} catch (error) {
		console.error("Error:", error)
		throw new Error(error.message || "Failed to check email in the database")
	}
}

// helper function to normalize a string into capital letter and the rest as lower cases
function normalizeString(str) {
	if (!str) return ""
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
