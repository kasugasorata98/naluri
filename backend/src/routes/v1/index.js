const express = require("express");
const router = express.Router();

router.use("/pi", require("./pi"));
router.use("/circumference", require("./circumference"));

module.exports = router;
