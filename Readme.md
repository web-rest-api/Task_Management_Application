# Task Management Application

A task management application built with Node.js, designed using Domain-Driven Design (DDD) principles. This application allows users to organize tasks into categories, track due dates, manage priorities, and mark tasks as complete.

## Features

- **Domain-Driven Design**: Core entities like Tasks, Categories, and Users are defined to reflect the application's business logic.
- **Task Management**: Create, update, and track tasks with attributes like title, description, due date, priority, and completion status.
- **Category Organization**: Group tasks into categories (e.g., Work, Personal, Urgent) for better organization.
- **Express API**: Exposes a REST API for managing tasks and categories.

## Technologies Used

- **Node.js**: JavaScript runtime for building backend services.
- **Express**: Web framework for creating a RESTful API.
- **dotenv**: For managing environment variables.
- **Nodemon**: Development tool for auto-restarting the server.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher recommended)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create a .env file in the root directory and define the port (or use the default port)**:

```
PORT=3000
```

4. **Start the application**:

```bash
npm run start
```

## Directory Structure

```
task-manager/
│   ├── domain/
│   │   ├── Task/
│   │   │   ├── Task.js
│   │   │   ├── TaskService.js
│   │   ├── Category/
│   │   │   ├── Category.js
│   │   │   ├── CategoryService.js
│   │   ├── User/
│   │   │   ├── User.js
│   │   │   ├── UserService.js
│   ├── infrastructure/
│   │   ├── Database.js
│   ├── app.js
│   ├── index.js
```

## API Endpoints

**Tasks**

- Create a Task: POST /tasks
- Complete a Task: PATCH /tasks/:id/complete

**Categories**

- Create a Category: POST /categories
- Add a Task to a Category: POST /categories/:categoryId/tasks

### Example Usage

To create a task, send a POST request to /tasks with a JSON payload:

```json
{
	"id": "1",
	"title": "Complete DDD project",
	"description": "Finish initial setup",
	"dueDate": "2024-10-30",
	"priority": "high"
}
```

### License

This project is licensed under the MIT License.
