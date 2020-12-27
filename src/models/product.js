'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Preenchimento obrigatório'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Preenchimento obrigatório'],
    },
    tags: [{
        type: String,
        required: [true, 'Preenchimento obrigatório'],
    }],
    image: {
        type: String,     
        required: false,
        trim: true
    },   
})

module.exports = mongoose.model('Product', schema)
