const express = require("express");
const router = express.Router();
const controlProjects = require("../controllers/projectsControl");
const { cookieValidator } = require("../middlewares/cookieValidator");

// Get all projects
router.get("/", cookieValidator, controlProjects.listProjects);

// Get single project
router.get("/:id", controlProjects.getProject);

// Create a new project
router.post("/", controlProjects.createProject);

// Update a project by its ID
router.post("/:id", controlProjects.updateProject);

// Delete a project by its ID
router.delete("/:id", controlProjects.deleteProject);

module.exports = router;
