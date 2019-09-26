var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CMS' });

});

router.get('/data', (req,res) => {
  res.render('data',)
})

router.get('/line', (req,res) => {
  res.render('line',)
})

module.exports = router;
