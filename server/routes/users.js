var express = require('express');
var router = express.Router();
const Users = require('../models/users');
// const helper = require('../helper/util');
// const auth = require('../helper/auth')
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// router.get('/', (req, res) => {
//   Users.find({}, (err, data) => {
//     if (err) return res.send(err)
//     res.json(data)
//   })
// });

// router.post('/register',(req,res,next) =>{

// })

// router.post('/')

module.exports = router;
