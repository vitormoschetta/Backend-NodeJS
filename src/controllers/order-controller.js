'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');
// const authService = require('../services/auth-service');


exports.create = async (req, res, next) => {
    try {
        // const token = req.body.token || req.query.token || req.headers['x-access-token']
        // const data = await authService.decodeToken(token)

        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201)
            .send({ success: true, message: 'Pedido cadastrado com sucesso! ', data: null })
    } catch (e) {
        console.log(e);
        res.status(500)
            .send({ success: true, message: 'Falha ao processar sua requisição', data: null })
    }
}


exports.getAll = async (req, res, next) => {
    try {
        let data = await repository.getAll()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}
