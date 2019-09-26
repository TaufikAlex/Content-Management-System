var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS' });

});

router.get('/data', (req,res) => {
  res.render('data',)
})

router.get('/datadates', (req,res) => {
  res.render('datadates',)
})
router.get('/line', (req,res) => {
  res.render('line',)
})

router.get('/bar', (req,res) => {
  res.render('bar',)
})
router.get('/pie', (req,res) => {
  res.render('pie',)
})
module.exports = router;
