const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControl")

// Get all users
router.get("/", userController.listUsers);

// Get single user
router.get("/:id", userController.getUser);

// Create a new user
router.post("/", userController.createUser);

// Update a user by its ID
router.post("/:id", userController.updateUser);

// Delete a user by its ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
