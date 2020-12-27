'use strict'

const ValidationContract = require('../validators/fluent.validator')
const GroupErrors = require('../validators/group.errors')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
const emailService = require('../services/email-service')


exports.create = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 4, 'O nome deve conter pelo menos 4 caracteres')
    contract.isEmail(req.body.email, 'E-mail inválido')
    contract.hasMinLen(req.body.password, 4, 'A senha deve conter pelo menos 4 caracteres')
    contract.isRequired(req.body.roles, 'Informe o Perfil! ')

    if (!contract.isValid()) {
        const errors = new GroupErrors().Group(contract.errors())
        res.status(400)
            .send({ success: false, message: errors})
            .end()
        return
    }

    try {
        const exist = await repository.exists(req.body.email)
        if (exist) {
            res.status(400)
                .send({ success: false, message: 'Este email já está cadastrado! ', data: { 'email': req.body.email} })
                .end()
            return
        }

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            roles: req.body.roles,
            password: md5(req.body.password + global.SALT_KEY)
        })
        
        emailService.send(
            req.body.email,
            'Bem vindo ao Node Store Vithor',
            global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201)
            .send({ success: true, message: 'Cliente cadastrado com sucesso! ', data: {'name': req.body.name, 'email': req.body.email}  })
    }
    catch (e) {
        res.status(500)
            .send({ success: false, message: 'Falha ao processar sua requisição! ', data: null })
    }
}


exports.authenticate = async(req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (!customer) {
            res.status(404)
                .send({ success: false, message: 'Usuário ou senha inválidos! ', data: null })
            return
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        });

        res.status(201).send({
            success: true,
            token: token,
            message: 'Usuário autenticado! ',
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        res.status(500)
            .send({ success: false, message: 'Falha ao processar sua requisição ', data: null })
    }
};






