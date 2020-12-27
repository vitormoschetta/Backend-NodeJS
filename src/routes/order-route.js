'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/order-controller');
const authService = require('../services/auth-service');

router.get('/', authService.authorize, controller.getAll);
router.post('/', authService.authorize, controller.create);

module.exports = router;