const express = require ('express');
var morgan = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = express();
app.use(morgan("dev"));

const catApi = require('./routes/categorieroutes');
const livApi = require('./routes/livreroutes');
const userApi = require('./routes/userroutes');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bibliotheque');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();

const cookieParser=require('cookie-parser');
app.use(cookieParser());
// parse application/json

app.use(cors());

app.use(bodyParser.json());
app.use('/uploads',express.static(__dirname + '/uploads'));

//api gestion user
app.use('/apiuser',userApi);
//api gestion categorie
app.use('/categorie',catApi);
//api gestion livres
app.use('/livre',livApi);



app.listen(process.env.port || 
    4000,function(){
    console.log('now listening for requests');
  });
  