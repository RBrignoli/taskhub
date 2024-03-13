const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControl")
const { cookieValidator } = require("../middlewares/cookieValidator");


router.get("/", cookieValidator, userController.listUsers);
router.get("/:id", cookieValidator, userController.getUser);
router.post("/", cookieValidator, userController.createUser);
router.post("/:id", cookieValidator, userController.updateUser);
router.delete("/:id", cookieValidator, userController.deleteUser);

module.exports = router;
