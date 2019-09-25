var express = require('express');
var router = express.Router();
const Todo = require('../models/datadates');

//==============Router GET(Read) Data=============
router.get('/', function (req, res, next) {
    Todo.find({},(req, res) =>{

    }).then((data) => {
        res.status(201).json(data);
    });
});

//=================Router Post (Add) Data========
router.post('/', function (req, res, next) {
    let todo = new Todo(req.body)
    todo.save().then((datadateCreate) => {
        res.status(201).json({
            success: true,
            message: "data have been add",
            datadateCreate
        });
    })
});
//=================Router Put (Edit) Data========

router.put('/:id', function (req, res, next) {
    Todo.findOneAndUpdate(
        { _id: req.params.id },
        {
            letter: req.body.letter, frequency
                : req.body.frequency
        },
        { new: true }

    ).then((datadateUpdate) => {
        res.status(201).json(
            {
                success: true,
                message: "data have been update",
                datadateUpdate
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
    Todo.findOneAndRemove({ _id: req.params.id }).then((datadateRemove) => {
        res.status(201).json(
            {
                success: true,
                message: "data have been deleted",
                datadateRemove
            });
    })
});

//=================Router get (find) Data========

router.get('/:id', (req, res, next) => {
    Todo.find({ _id: req.params.id }).then((datadateFind) => {
        res.status(201).json({
            success: true,
            message: "data have been Find",
            datadateFind
        });
    })
})

//=================Router Post (Browse) Data========

router.post('/search', (req, res, next) => {
    let temp = {}
    const { letter, frequency } = req.body;

    if (letter) temp.letter = letter;
    if (frequency) temp.frequency = frequency;

    Todo.find(temp).then((datadateSearch) => {
        res.status(201).json(
            datadateSearch
        );
    })
})
module.exports = router;