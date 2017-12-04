'use-strict'; 

const mongoose = require('mongoose'); 
const Product = mongoose.model('Product'); 
const validate = require("validate.js"); 
const modelProduct = 'title price slug tags'

exports.get = (req, res, next) =>  {
    Product
        .find({ active:true },
                modelProduct)
            .then(data =>  {
                res.status(200).send(data ); 
            }).catch(e =>  {
                res.status(400).send(e ); 
            }); 
}; 

exports.getBySlug = (req, res, next) =>  {
    Product
        .find({ slug: req.params.slug,
                active: true
            },  modelProduct)
            .then(data =>  {
                res.status(200).send(data ); 
            }).catch(e =>  {
                res.status(400).send(e ); 
            }); 
};

exports.getByTags = (req, res, next) =>  {
    Product
        .find({ tags: req.params.tags,
                active: true
            },  modelProduct)
            .then(data =>  {
                res.status(200).send(data ); 
            }).catch(e =>  {
                res.status(400).send(e ); 
            }); 
};

exports.post = (req, res, next) =>  {

    var product = new Product(req.body); 

    if ( ! valiteFieldsProduct(product)) {
        res.status(400).send( {message:'Preencha os campos corretamente!'}); 
    }
    
    product.save()
            .then(() =>  {
                res.status(201).send( {message:'Your product has been successfully saved!'}); 
            }).catch(() =>  {
                res.status(500).send( {message:'Internal error.'}); 
            }); 
}

exports.put = (req, res, next) =>  {
    Product.findByIdAndUpdate(req.params.id, {
        $set:{
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price
        }
        }).then( data => {
            res.status(200).send({
                message: 'your product was edited!'
            });
        }).catch(e =>{
            res.status(400).send({
                message:"An error ocurred in edition of your product!",
                data: e
            });
        });
};

exports.delete = (req, res, next) =>  {
    Product.findOneAndRemove(req.body.id)
        .then( data => {
            res.status(200).send({
                message: 'your product was removed!'
            });
        }).catch(e =>{
            res.status(400).send({
                message:"An error ocurred in removed of your product!",
                data: e
            });
        });
}

function valiteFieldsProduct (product) {

    if (validate.isString(product.title) && validate.isString(product.slug) && 
        validate.isString(product.description) && validate.isNumber(product.price) && 
        validate.isBoolean(product.active) && validate.isArray(product.tags)) {
             return true; 
    }
            
    return false; 
}; 