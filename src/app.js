
'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();
const router = express.Router();

// conecta ao banco
const strcon = 'mongodb://localhost:27017/NodeStr'
mongoose.connect(strcon, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    'Conectado ao banco de dados!'
})

// carrega os Models
const Product = require('./models/product')

// carrega as rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

// converte corpo http em json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)

module.exports = app
