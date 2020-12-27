'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// map para mongodb
// nao precisa criar o Id, pois o mongodb o cria automaticamente
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
    image: {
        type: String,     
        trim: true
    }
})

module.exports = mongoose.model('Product', schema)
