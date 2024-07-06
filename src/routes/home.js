const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.get('/product', homeController.product);
router.get('/', homeController.home);

module.exports = router;
