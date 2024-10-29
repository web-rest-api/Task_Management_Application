const express = require("express")
require("dotenv").config() // Load environment variables

const app = express()
const port = process.env.PORT || 3000

// main routes
const router = require("./routes/index.js")

// Middleware to parse JSON
app.use(express.json())
app.use("/api/", router)

app.get("/", (req, res) => {
	res.json({
		msg: "Welcome to this Task Management Application 🤳",
	})
})

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
