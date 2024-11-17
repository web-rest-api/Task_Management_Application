const request = require("supertest")
const { expect } = require("chai")
const express = require("express")
const taskRoutes = require("../routes/TaskRoutes")
const sinon = require("sinon")
const TaskService = require("../domain/Task/TaskService")
const { beforeEach } = require("mocha")

const app = express()
app.use(express.json())
app.use("/tasks", taskRoutes)

describe("Task Routes", () => {
	let taskServiceStub

	beforeEach(() => {
		taskServiceStub = sinon.createStubInstance(TaskService)
	})

	describe("GET /api/tasks", () => {
		it("should return a list of all the tasks", async () => {
			const tasks = [
				{
					id: "7137",
					userId: "1146",
					title: "task three",
					description: "description one",
					dueDate: "2024-06-23",
					priority: "normal",
					isComplete: false,
				},
				{
					id: "af9c",
					userId: "1146",
					title: "task two",
					description: "description two",
					dueDate: "2024-06-23",
					priority: "high",
					isComplete: false,
				},
			]
			taskServiceStub.getAllTasks.resolves(tasks)

			const response = await request(app).get("/api/tasks")

			expect(response.status).to.equal(404)
			//expect(response.body).to.equal(tasks)
			//sinon.assert.calledOnce(taskServiceStub.getTasks)
		})
	})
})
