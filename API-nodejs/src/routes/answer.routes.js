const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

// Create
router.post('/create', authenticateUser, answerController.Create);


module.exports = router;