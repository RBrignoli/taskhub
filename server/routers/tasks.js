const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksControl")
const { cookieValidator } = require("../middlewares/cookieValidator");


router.get("/", cookieValidator, taskController.listTasks);
router.get("/:id", cookieValidator, taskController.getTask);
router.post("/", cookieValidator, taskController.createTask);
router.post("/:id", cookieValidator, taskController.updateTask);
router.delete("/:id", cookieValidator, taskController.deleteTask);

module.exports = router;
