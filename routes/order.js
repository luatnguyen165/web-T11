const express = require('express');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/:cartId',createOrder);


module.exports =router;