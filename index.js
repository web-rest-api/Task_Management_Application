const express = require("express")
require("dotenv").config() // Load environment variables

const app = express()
const port = process.env.PORT || 3000

// Middleware to parse JSON
app.use(express.json())

app.get("/", (req, res) => {
	res.json({
		msg: "Welcome to this Task Management Application 🤳",
	})
})

app.post("/api/tasks", (req, res) => {
	newTask = {
		...req.body,
	}

	console.log(newTask)

	res.status(201).json(newTask)
})

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
