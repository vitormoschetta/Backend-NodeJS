'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')


exports.create = async (data) => {
    const model = new Customer(data)
    await model.save()
}

exports.authenticate = async(data) => {
    const model = await Customer.findOne({
        email: data.email,
        password: data.password
    });
    return model;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.exists = async (email) => {
    const model = await Customer.findOne({ email: email })
    if (model != null)
        return true

    return false
}

