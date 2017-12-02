'use-strict'; 

const mongoose = require('mongoose'); 
const Product = mongoose.model('Product'); 
const validate = require("validate.js"); 

exports.post = (req, res, next) =>  {

    var product = new Product(req.body);

    if (!valiteFieldsProduct(product)) {
        res.status(400).send({message: 'Preencha os campos corretamente!'}); 
    }
    
    product.save()
            .then(() =>  {
                res.status(201).send({message: 'Your product has been successfully saved!'}); 
            }).catch(() =>  {
                res.status(500).send({message: 'Internal error.' }); 
            }); 
}

exports.put = (req, res, next) =>  {
    const id = req.params.id; 
    res.status(200).send( {
        id:id, 
        item:req.body
    }); 
}

exports.delete = (req, res, next) =>  {
    res.status(200).send(req.body); 
}

function valiteFieldsProduct (product) {

    if (validate.isString(product.title) && validate.isString(product.slug) && 
        validate.isString(product.description) && validate.isNumber(product.price) && 
        validate.isBoolean(product.active) && validate.isArray(product.tags)) {
             return true; 
    }
            
    return false; 
};