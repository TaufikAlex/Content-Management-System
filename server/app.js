const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')


const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/cmsdb', {
  useCreateIndex: true,
  useNewUrlParser: true
});;


var dataRouter = require('./routes/data');
var usersRouter = require('./routes/users');
var mapsRouter = require('./routes/maps');
var datadatesRouter = require('./routes/datadates');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

app.use('/api/data', dataRouter);
app.use('/api/users', usersRouter);
app.use('/api/maps', mapsRouter);
app.use('/api/datadates', datadatesRouter);


module.exports = app;
