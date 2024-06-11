const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/token");
const transactionController = require("../controllers").transaction;

router.post("/add", verifyToken, transactionController.createTransaction);

module.exports = router;
