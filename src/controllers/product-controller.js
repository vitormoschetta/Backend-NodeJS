'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent.validator')
const GroupErrors = require('../validators/group.errors')
const repository = require('../repositories/product-repository')

exports.getAll = (req, res, next) => {
    repository
        .getAll()
        .then(data => { res.status(200).send(data) })
        .catch(e => { res.status(400).send(e) })
}

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => { res.status(200).send(data) })
        .catch(e => { res.status(400).send(e) })
}


exports.create = (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 4, 'O Nome do Produto deve conter pelo menos 4 caracteres. ')
    contract.isSmallerThan(req.body.price, 1, 'O Preço informado é inválido. ')

    if (!contract.isValid()) {
        let errors = new GroupErrors().Group(contract.errors())
        // let dataResult = new DataResult(false, errors, req.body)   
        res.status(400).send({ success: false, message: errors, data: req.body }).end()
        return
    }

    repository
        .create(req.body)
        .then(data => { res.status(201).send({success: true, message: "Produto cadastrado com sucesso", data: data }) })
        .catch(e => { res.status(400).send({success: false, message: 'Falha ao cadastrar Produto.', data: e }) })
}


exports.update = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(data => { res.status(200).send({ message: 'Produto atualizado com sucesso!', data: data }) })
        .catch(e => { res.status(400).send({ message: 'Falha ao cadastrar Produto.', data: e }) })
}

exports.delete = (req, res, next) => {
    repository
        .delete(req.params.id)        
        .then(data => { res.status(200).send({ message: 'Produto removido com sucesso!', data: data }) })
        .catch(e => { res.status(400).send({ message: 'Falha ao cadastrar Produto.', data: e }) })
}





