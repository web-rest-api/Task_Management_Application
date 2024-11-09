const express = require("express")
const userRoutes = express.Router()
const UserService = require("../domain/User/UserService")
const { userValidation } = require("../middleware/userValidation")

// Initialize services
const userService = new UserService()

userRoutes.get("/", (req, res) => {
	res.json({ msg: "this is the users route !!" })
})

userRoutes.post("/", userValidation, async (req, res) => {
	const { userName, email } = req.userData
	try {
		const newUser = await userService.createUser(userName, email)
		res.status(201).json(newUser)
	} catch (error) {
		// Catch any other errors and respond with a 500 Internal Server Error
		console.error("Error creating task:", error)
		res.status(500).json({ error: "An error occurred while creating the user" })
	}
})

module.exports = userRoutes

