'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')


exports.getAll = async () => {
    const res = await Product.find({}, '_id name price')
    return res
    // o primeiro parâmetro de find() são os filtros, caso existam   
    // o segundo parâmetro de find() são as propriedades que desejamos retornar                                 
}


exports.getById = async (id) => {
    const res = await Product.findById({ _id: id }, '_id name price')
    return res
}


exports.create = async (data) => {
    let product = new Product(data)
    await product.save()
}


exports.update = async (id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: {
                name: data.name,
                price: data.price
            }
        })
}


exports.delete = async (id) => {
    await Product.findByIdAndRemove({ _id: id })
}


exports.exists = async (name) => {
    let product = await Product.findOne({ name: name })
    if (product != null)
        return true

    return false
}


exports.existsUpdate = async (id, name) => {
    let product = await Product.findOne({ name: name })

    if (product != null) {
        if (product.id != id)
            return true
    }

    return false
}