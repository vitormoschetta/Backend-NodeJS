'use strict';

const express = require('express')
const router = express.Router()
const controller = require('../controllers/customer-controller')


router.post('/', controller.create);
router.post('/authenticate', controller.authenticate);

module.exports = router
