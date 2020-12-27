'use strict'

const ValidationContract = require('../validators/fluent.validator')
const GroupErrors = require('../validators/group.errors')
const repository = require('../repositories/product-repository')
const azure = require('azure-storage');
const guid = require('guid');
var settings = require('../settings');


exports.create = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 4, 'O Nome do Produto deve conter pelo menos 4 caracteres. ')
    contract.isSmallerThan(req.body.price, 1, 'O Preço informado é inválido. ')
    contract.isRequired(req.body.tags, 'Informe a Tag do produto! ')

    if (!contract.isValid()) {
        let errors = new GroupErrors().Group(contract.errors())
        res.status(400)
            .send({ success: false, message: errors, data: req.body })
            .end()
        return
    }

    try {
        let exist = await repository.exists(req.body.name)
        if (exist) {
            res.status(400)
                .send({ success: false, message: 'Já existe um Produto cadastrado com este Nome! ', data: req.body })
                .end()
            return
        }


        // se a imagem do produto for passada envia para o azure
        if (req.body.image != null) {
            // Cria o Blob Service
            const blobSvc = azure.createBlobService(settings.containerConnectionString);

            var filename = guid.raw().toString() + '.jpg';
            let rawdata = req.body.image;
            let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let type = matches[1];
            let buffer = new Buffer(matches[2], 'base64');

            // Salva a imagem
            await blobSvc.createBlockBlobFromText('product-images', filename, buffer, {
                contentType: type
            }, function (error, result, response) {
                if (error) {
                    filename = 'default-product.png'
                }
            });
        }

        await repository.create({
            name: req.body.name,
            price: req.body.price,
            image: (filename != undefined) 
                ? 'https://vithornodestore.blob.core.windows.net/product-images/' + filename 
                : 'https://vithornodestore.blob.core.windows.net/product-images/default.png'
        })
        res.status(201)
            .send({ success: true, message: "Produto cadastrado com sucesso! ", data: req.body })
    }
    catch (e) {
        console.log(e)
        res.status(500)
            .send({ success: false, message: "Falha ao processar sua requisição! ", data: null })
    }
}


exports.update = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 4, 'O Nome do Produto deve conter pelo menos 4 caracteres. ')
    contract.isSmallerThan(req.body.price, 1, 'O Preço informado é inválido. ')

    if (!contract.isValid()) {
        let errors = new GroupErrors().Group(contract.errors())
        res.status(400)
            .send({ success: false, message: errors, data: req.body })
            .end()
        return
    }

    try {
        let existUpdate = await repository.existsUpdate(req.params.id, req.body.name)
        if (existUpdate) {
            res.status(400)
                .send({ success: false, message: 'Já existe um Produto cadastrado com este Nome! ', data: req.body })
                .end()
            return
        }

        await repository.update(req.params.id, req.body)
        res.status(200)
            .send({ success: true, message: "Produto atualizado com sucesso! ", data: req.body })
    }
    catch (e) {
        res.status(500)
            .send({ success: false, message: "Falha ao processar sua requisição! ", data: null })
    }
}


exports.delete = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id)
        if (data == null) {
            res.status(404)
                .send({ success: false, message: `Produto com Id ${req.params.id} não encontrado! `, data: null })
                .end()
            return
        }

        await repository.delete(req.params.id)
        res.status(200)
            .send({ success: true, message: "Produto removido com sucesso! ", data: data })
    }
    catch (e) {
        res.status(500)
            .send({ success: false, message: "Falha ao processar sua requisição! ", data: null })
    }
}


exports.getAll = async (req, res, next) => {
    try {
        let data = await repository.getAll()
        res.status(200)
            .send(data)
    }
    catch (e) {
        res.status(500)
            .send({ message: 'Falha ao processar sua requisição! ' })
    }
}


exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id)
        res.status(200)
            .send(data)
    }
    catch (e) {
        res.status(500)
            .send({ message: 'Falha ao processar sua requisição! ' })
    }
}








