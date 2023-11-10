const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "#TODO LIST ALL ROUTES" });
});


module.exports = router;