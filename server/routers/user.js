const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControl")
const { cookieValidator } = require("../middlewares/cookieValidator");


router.get("/", userController.listUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.post("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
