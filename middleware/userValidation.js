const {
	validateRequiredFields,
	isStringAlphanumeric,
	checkEmailExists,
} = require("../utils/validation")
require("dotenv").config() // Load environment variables

exports.userValidation = async (req, res, next) => {
	try {
		// Destructure request body and validate required fields
		const { userName, email } = req.body

		// required fields
		try {
			validateRequiredFields({ fieldName: "userName", value: userName })
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}

		// type string and alphanumeric
		try {
			isStringAlphanumeric({ fieldName: "userName", value: userName })
		} catch (error) {
			return res.status(400).json({ error: error.message })
		}

		// check type
		if (typeof email !== "string") {
			return res.status(400).json({
				error: "Email and userName must be strings !",
			})
		}

		// Validate email format
		if (!validateEmail(email)) {
			return res.status(400).json({
				error: "Invalid email format ...",
			})
		}

		// Validate userName (alphanumeric check)
		const isAlphanumeric = (str) => /^[a-zA-Z0-9\s!?]+$/.test(str)
		if (typeof userName !== "string" || !isAlphanumeric(userName)) {
			return res.status(400).json({
				error: "The userName must be a string with no weird characters!",
			})
		}

		// Check if email already exists
		try {
			const registeredUser = await checkEmailExists(email)
			if (registeredUser.length)
				return res.status(400).json({ msg: "Email already in use" })
		} catch (error) {
			// Handle the error if the email already exists
			return res.status(400).json({ error: error.message })
		}

		// Pass data to the next middleware
		req.userData = { userName, email }
		next()
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating user:", error)
		res.status(500).json({ error: "An error occurred while creating the user" })
	}
}

// Function to validate email format
const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)
}
