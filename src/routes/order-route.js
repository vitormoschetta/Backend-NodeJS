'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;