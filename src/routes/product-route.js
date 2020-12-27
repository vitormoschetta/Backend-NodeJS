'use strict';

const express = require('express')
const router = express.Router()
const controller = require('../controllers/product-controller')
const authService = require('../services/auth-service')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', authService.authorize, controller.create) // <-- add authService na rota que deseja autenticar
router.put  ('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router
