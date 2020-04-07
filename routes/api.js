const express = require ('express');
const router = express.Router();
const Cars = require('../models/cars');

// get a list of cars from the db
router.get('/cars', function(req, res, next){
    /* car.find({}).then(function(cars){
        res.send(cars);
    }); */
    car.geoNear(
        {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        {maxDistance: 100000, spherical: true}
    ).then(function(cars){
        res.send(cars);
    }).catch(next);
});

// add a new car to the db
router.post('/cars', function(req, res, next){
    Cars.create(req.body).then(function(car){
        res.send(car);
    }).catch(next);
});

// update a car in the db
router.put('/cars/:id', function(req, res, next){
    Cars.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Cars.findOne({_id: req.params.id}).then(function(car){
            res.send(car);
        });
    }).catch(next);
});

// delete a car from the db
router.delete('/cars/:id', function(req, res, next){
    Cars.findByIdAndRemove({_id: req.params.id}).then(function(car){
        res.send(car);
    }).catch(next);
});

module.exports = router;
