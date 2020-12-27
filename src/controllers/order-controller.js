'use strict';

const ValidationContract = require('../validators/fluent.validator')
const GroupErrors = require('../validators/group.errors')
const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');


exports.create = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.isRequired(req.body.items, 'Selecione os itens!')
    contract.isRequired(req.body.amount, 'Informe o valor taotal do pedido!')
  
    if (!contract.isValid()) {
        const errors = new GroupErrors().Group(contract.errors())
        res.status(400)
            .send({ success: false, message: errors})
            .end()
        return
    }


    try {
        const token = req.body.token || req.query.token || req.headers['access-token']
        const data = await authService.decodeToken(token)

        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items,
            amount: req.body.amount
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
