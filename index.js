const express = require('express');   // framework que cuida das requisicoes da API
const bodyParser = require('body-parser');   //biblioteca dados cliente convertidos para jason
const mongoose = require('mongoose');    //conexao com banco de dados mongo.db


// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/cars_gps');
mongoose.Promise = global.Promise;

//set up static files
app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// listen for requests
app.listen(  5000, function(){                       //aonde se troca as portas do servidor
    console.log('now listening for requests');
});
