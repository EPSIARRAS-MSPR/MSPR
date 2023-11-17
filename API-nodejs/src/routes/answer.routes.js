const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answer.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

// Create
router.post('/create', authenticateUser, answerController.Create);

router.get('/:answerOf', authenticateUser, answerController.GetAllById);

router.patch('/update', authenticateUser, answerController.Update);

router.delete('/delete', authenticateUser, answerController.Delete);

module.exports = router;