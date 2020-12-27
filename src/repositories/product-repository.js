'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')


exports.create = async (data) => {
    const model = new Product(data)
    await model.save()
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

exports.getById = async (id) => {
    const model = await Product.findById({ _id: id }, '_id name price')
    return model
}

exports.getAll = async () => {
    const model = await Product.find({}, '_id name price')
    return model
}

exports.exists = async (name) => {
    const model = await Product.findOne({ name: name })
    if (model != null)
        return true

    return false
}

exports.existsUpdate = async (id, name) => {
    const model = await Product.findOne({ name: name })

    if (model != null) {
        if (model.id != id)
            return true
    }

    return false
}