var express = require('express');
var router = express.Router();
const Maps = require('../models/maps');

//==============Router GET(Read) Maps=============

router.get('/', function (req, res, next) {
    Maps.find().then((maps) => {
        res.status(201).json(maps);
    });
});

//=================Router Post (Add) Maps========

router.post('/', function (req, res, next) {
    let maps = new Maps(req.body)
    maps.save().then((mapsCreated) => {
        res.status(201).json({
            success: true,
            message: "Maps have been add Maps",
            mapsCreated
        });
    })
});

//=================Router Put (Edit) Maps========

router.put('/:id', function (req, res, next) {
    Maps.findOneAndUpdate(
        { _id: req.params.id },
        {
            tittle: req.body.tittle, 
            lat: req.body.lat,
            lng: req.body.lng
        },
        { new: true }
    ).then((mapsUpdate) => {
        res.status(201).json({
            success: true,
            message: "Maps have been Update Maps", 
            mapsUpdate
        });
    }).catch((err) => {
        res.json({
            success: false,
            message: 'Error cuk'
        })
    })
});

//=================Router delete (delete) Maps========

router.delete('/:id', function (req, res, next) {
    Maps.findOneAndRemove({ _id: req.params.id }).then((mapsRemove) => {
        res.status(201).json({
            success: true,
            message: "Maps have been deleted Maps",
            mapsRemove
        });
    })
});

//=================Router get (find) Maps========

router.get('/:id', (req, res, next) => {
    Maps.find({ _id: req.params.id }).then((mapsFind) => {
        res.status(201).json({
            success: true,
            message: "Maps Found Maps",
            mapsFind
        });
    })
})

//=================Router Post (Browse) Maps========

router.post('/search', (req, res, next) => {
    let temp = {}
    const { tittle, lat, lng } = req.body;

    if (tittle) temp.tittle = {$regex: tittle, $options: 'i'};
    if (lat) temp.lat = lat;
    if (lng) temp.lng = lng;

    Maps.find(temp).then((mapsSearch) => {
        res.status(201).json(mapsSearch);
    }).catch((err) =>{
        res.json({
            success:false,
            message:"error search",
        })
    })
})
module.exports = router;