const express = require("express");
const controlAuth = require("../controllers/authControl");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "auth router ok" });
});

router.post("/signup", controlAuth.signup);
module.exports = router;
