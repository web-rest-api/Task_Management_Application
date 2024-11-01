exports.userValidation = (req, res, next) => {
	try {
		// Destructure request body and validate required fields
		const { userName, email } = req.body

		// not empty
		if (!userName || !email) {
			// Respond with a 400 Bad Request if any required field is missing
			return res.status(400).json({
				error: "All fields are required: email, userName",
			})
		}

		// valid email format through regex (regular expressions)
		if (!validateEmail(email)) {
			return res.status(400).json({
				error: "Invalid email format ...",
			})
		}
		// valid userName
		// alphanumeric check
		const isAlphanumeric = (str) => /^[a-zA-Z0-9\s!?]+$/.test(str)
		// title
		if (typeof userName !== "string" || !isAlphanumeric(userName))
			return res.status(400).json({
				error: "The userName must be a string with no weird characters !",
			})

		const userData = { userName, email }
		// pass data to the next middleware
		req.userData = userData
		next()
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating user:", error)
		res.status(500).json({ error: "An error occurred while creating the user" })
	}
}

const validateEmail = (email) => {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)
}
