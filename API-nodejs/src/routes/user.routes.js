const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticateUser = require("../middlewares/authentication.middleware");

// SignUp
router.post('/signup', userController.SignUp);

// SignIn
router.post('/signin', userController.SignIn);

// Verify
router.post('/verify', userController.VerifyAccount);

// Resend verification email
router.post('/resend-verification', userController.ResendVerification);

// Get profile
router.get('/profile', authenticateUser, userController.GetProfile);

// Update
router.patch('/update', authenticateUser, userController.Update);

// Delete
router.delete('/delete', authenticateUser, userController.Delete);
module.exports = router;