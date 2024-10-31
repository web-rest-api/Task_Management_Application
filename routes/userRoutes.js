const express = require("express")
const userRoutes = express.Router()

userRoutes.get("/", (req, res) => {
	res.json({ msg: "this is the users route !!" })
})

module.exports = userRoutes
