'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.getAll = () => {
    return Product.find({ },' _id name price')   
    // o primeiro parâmetro de find() são os filtros, caso existam   
    // o segundo parâmetro de find() são as propriedades que desejamos retornar                                 
}

exports.getById = (id) => {
    return Product.findById({ _id: id }, '_id name price')      
}

exports.create = (data) => {     
    let product = new Product()
    product.name = data.name
    product.price = data.price    
    return product.save()  
}

exports.update = (id, data) => {
    return Product
        .findByIdAndUpdate(id, {
           $set: {
               name: data.name,
               price: data.price
           } 
        })      
}

exports.delete = (id) => {
    return Product.findOneAndRemove({_id: id})       
}

function Exists(name) {
    let product = Product.find({ name: name },' _id name price')  
    if (product != null)
        return true

    return false
}