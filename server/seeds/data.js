var mongoose = require('mongoose');
const fs = require('fs');
const dataDate = require('../models/datadates');
const path = require('path');

mongoose.connect('mongodb://localhost/cmsdb', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false 
});;

let data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));

dataDate.insertMany(data, (err)=>{
    if (err) throw err;
})