require("dotenv").config() // Load environment variables

exports.userValidation = async (req, res, next) => {
	try {
		// Destructure request body and validate required fields
		const { userName, email } = req.body

		// Check if required fields are not empty
		if (!userName || !email) {
			return res.status(400).json({
				error: "All fields are required: email, userName",
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
			await checkEmailExists(email)
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

// Async function to check if email already exists
async function checkEmailExists(email) {
	try {
		const response = await fetch(
			`${process.env.USER_SERVICE_URI}?email=${email}`
		)
		const data = await response.json()

		if (data.length > 0) {
			throw new Error("Email already exists in the database!")
		}
	} catch (error) {
		console.error("Error:", error)
		throw new Error(error.message || "Failed to check email in the database")
	}
}
