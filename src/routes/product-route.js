'use strict';

const express = require('express')
const router = express.Router()
const controller = require('../controllers/product-controller')
const authService = require('../services/auth-service')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', authService.isAdmin, controller.create) // <-- add authService como interceptador de rota que se deseja autenticar
router.put  ('/:id', authService.isAdmin, controller.update)
router.delete('/:id', authService.isAdmin, controller.delete)

module.exports = router
