const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authorization');

router.get('/test', verifyToken, userController.test);
router.post('/register' ,userController.register);
router.post('/login', userController.login);


module.exports = router