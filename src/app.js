'use strict'

const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const connectionString = 'mongodb://wfgoncalves:pabx1305@ds036079.mlab.com:36079/nodestotage';

const app = express(); 
const router = express.Router(); 

mongoose.connect(connectionString, { useMongoClient: true });

const Product = require('./models/product');

//carregar as rotas
const indexRouter = require('./routes/index-route'); 
const productRouter = require('./routes/product-route'); 

app.use(bodyParser.urlencoded( {extends:false })); 
app.use(bodyParser.json()); 

app.use('/', indexRouter); 
app.use('/products', productRouter); 

module.exports = app; 
