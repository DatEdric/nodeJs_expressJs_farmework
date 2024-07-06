const express = require('express');
const router = express.Router()
const authenticate = require('../app/middlewares/authenticate');

const adminController = require('../app/controllers/AdminController');
//authenticate
router.get('/profile', authenticate, adminController.profile);
// dashboard-center
router.get('/dashboard-center',authenticate,adminController.dashboardCenter);


// Đăng ký admin
router.get('/register-page',adminController.register);
router.post('/register',adminController.sendReqRegister);

// Đăng nhập admin
router.get('/login-page',adminController.signInPage );
router.post('/login',adminController.signIn );

// Trang quản trị
router.get('/',adminController.dashboard );

module.exports = router;
