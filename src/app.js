'use strict'
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router(); 

//carregar as rotas
const indexRouter = require('./routes/index-route');
const productRouter = require('./routes/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: false }));

app.use('/', indexRouter); 
app.use('/products', productRouter);

module.exports = app;
