const express = require("express");

const router = express.Router();
const homeController = require('../controllers/home_controller');

// console.log('Router Loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/post',require('./posts'));
router.use('/comment',require('./comments'));


router.use('/api',require('./api'));

module.exports = router;