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
	const data = req.userData
	res.json({ data })
})

module.exports = userRoutes
