const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "LANDING PAGE" });
});


module.exports = router;