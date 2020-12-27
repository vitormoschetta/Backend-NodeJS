'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.create = async(data) => {
    var order = new Order(data);
    await order.save();
}

exports.getById = async (id) => {
    const model = await Order
        .findById({ _id: id }, '_id number status customer items amount')
        .populate('customer', 'name')
        .populate('items.product', 'name ');
        
    return model
}

exports.getAll = async(data) => {
    var res = await Order
        .find({}, '_id number status customer items amount')
        .populate('customer', 'name')
        .populate('items.product', 'name');
    return res;
}

