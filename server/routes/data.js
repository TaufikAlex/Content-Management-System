var express = require('express');
var router = express.Router();
const Data = require('../models/data');

//==============Router GET(Read) Data=============

router.get('/', function (req, res, next) {
  Data.find({},(req,res)=>{
    
  }).then((data) => {
    res.status(201).json(data);
  });
});

//=================Router Post (Add) Data========

router.post('/', function (req, res, next) {
  console.log(req.body);
  
  let data = new Data(req.body)
  console.log(data);
  
  data.save().then((dataCreated) => {
    res.status(201).json({
      success: true,
      message: "data have been add",
      dataCreated
    });
  })
});

//=================Router Put (Edit) Data========

router.put('/:id', function (req, res, next) {
  Data.findOneAndUpdate(
    { _id: req.params.id },
    {
      letter: req.body.letter, frequency
        : req.body.frequency
    },
    { new: true }
  ).then((dataUpdated) => {
    res.status(201).json({
      success: true,
      message: 'Error cuk',
      dataUpdated
    });
  }).catch((err) => {
    res.json({
      success: false,
      message: 'Error cuk'
    })
  })
});

//=================Router delete (delete) Data========

router.delete('/:id', function (req, res, next) {
  Data.findOneAndRemove({ _id: req.params.id }).then((dataRemoved) => {
    res.status(201).json({
      success: true,
      message: "data have been deleted",
      dataRemoved
    });
  })
});

//=================Router get (find) Data========

router.get('/:id', (req, res, next) => {
  Data.findById({ _id: req.params.id }).then((datafind) => {
    res.status(201).json({
      success: true,
      message: "data have been Find",
      datafind
    });
  })
})

//=================Router Post (Browse) Data========

router.post('/search', (req, res, next) => {
  let temp = {}
  const { letter, frequency } = req.body;
  console.log(letter);
  

  if (letter) temp.letter = letter;
  if (frequency) temp.frequency = frequency;
  console.log(temp);
  
  Data.find(temp).then((dataSearch) => {
    console.log(dataSearch);
    
    res.status(201).json(dataSearch );
  })
})
module.exports = router;