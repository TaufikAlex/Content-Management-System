var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS' });

});

router.get('/login',(req,res,next) =>{
  res.render('home/login')
})

router.get('/data', (req,res) => {
  res.render('data',)
})

router.get('/datadates', (req,res) => {
  res.render('datadates',)
})
router.get('/maps', (req,res) => {
  res.render('maps')
})
//========================CHARTS===================
router.get('/line', (req,res) => {
  res.render('charts/line',)
})

router.get('/bar', (req,res) => {
  res.render('charts/bar',)
})
router.get('/pie', (req,res) => {
  res.render('charts/pie',)
})
router.get('/map', (req,res) => {
  res.render('charts/maps')
})
//==================END CHARTS=====================
module.exports = router;
