var express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET home page. */
router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/forgot',userController.forgotPassword);
router.get('/verify/:token',userController.verify);
router.post('/verify/:token',userController.verify);
router.get('/logout',userController.logout);

module.exports = router;
