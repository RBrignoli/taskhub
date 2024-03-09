const express = require("express");
const router = express.Router();
const controlComments = require("../controllers/commentsControl");
const { cookieValidator } = require("../middlewares/cookieValidator");


// Get task comments
router.get("/:id", cookieValidator, controlComments.listComments);

// Create a new comment
router.post("/", cookieValidator, controlComments.createComment);

// Update a comment by its ID
router.patch("/:id", cookieValidator, controlComments.updateComment);

// Delete a comment by its ID
router.delete("/:id", cookieValidator, controlComments.deleteComment);

module.exports = router;
