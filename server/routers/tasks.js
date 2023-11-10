const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksControl")

// Get all tasks
router.get("/", taskController.listTasks);

// Get single task
router.get("/:id", taskController.getTask);

// Create a new task
router.post("/", taskController.createTask);

// Update a task by its ID
router.post("/:id", taskController.updateTask);

// Delete a task by its ID
router.delete("/:id", taskController.deleteTask);

module.exports = router;
