const express = require('express');
const router = express.Router();

const userRole = require('../controllers/userRole.controller');
const authenticateUser = require('../middlewares/authentication.middleware');
const checkRoles = require('../middlewares/verifRole.middleware');

router.get('/fetch-all', userRole.getAll);
router.get('/fetch/:id', userRole.getById);
router.post('/create', [authenticateUser, checkRoles(['utilisateur'])], userRole.Create);
router.patch('/update/:id', [authenticateUser, checkRoles(['administrateur'])], userRole.Update);
router.delete('/delete/:id', [authenticateUser, checkRoles(['administrateur'])], userRole.DeleteById);


module.exports = router;