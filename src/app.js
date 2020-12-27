'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const settings = require('./settings')

const app = express();
const router = express.Router();


// conecta ao banco
mongoose.connect(settings.connectionString, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    })    
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    'Conectado ao banco de dados!'
})


// carrega os Models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')


// carrega as rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')


// converte corpo http em json
app.use(bodyParser.json({
    limit: '5mb'    // <-- define tamanho maximo do JSON nas requisições
}))
app.use(bodyParser.urlencoded({ 
    extended: false 
}))


// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)

module.exports = app
