const express = require("express");
const controlAuth = require("../controllers/authControl");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "auth router ok" });
});

router.post("/signup", controlAuth.signup);
router.post("/signin", controlAuth.signin);
router.post("/logout", controlAuth.logout);
router.post("/google", controlAuth.google);


module.exports = router;
