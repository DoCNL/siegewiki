const Season = require('../models/season');
const SiegeMap = require('../models/siegemap');
const defS = require('../../config/default_data');

//todo: add maps to seasons

function getAll(req, res) {
    SiegeMap.find({}, {__v: 0})
        .then(siegemaps => {
            res.status(200).send(siegemaps);
            console.log('>>siegemaps returned');
        });
};

function create(req, res) {
    SiegeMap.create({
        name: req.body.name,
        description: req.body.description,
        imageLink: req.body.imageLink,
        season: defS.getDefaultSeason(),
        rankedAvailability: req.body.ranked
    })  
    .then(() =>
        res.status(200).send({Message: "Siegemap created succesfully."}),
        console.log('>>siegemap created'))
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'A siege map with this name already exists.'});
            } else {
                res.status(401).send({err});
            }
    });
};

function edit(req, res) {
    SiegeMap.findOne( { _id: req.body.id } )
    .then(siegemap => {
        if(siegemap === null){
            res.status(401).send({ Error :'Siegemap does not exist.'})
        }
        else {
            siegemap.set({
                name: req.body.name,
                description: req.body.description,
                imageLink: req.body.imageLink,
                season: defS.getDefaultSeason(),
                rankedAvailability: req.body.ranked
            })
            siegemap.save()
            .then(() => {
                res.status(200).send({Message: "Siegemap edited succesfully"})
                console.log('>>>siegemap edited')
            })
            .catch((err) => res.status(401).send({err}));
        }
    });
};

function remove(req, res) {
    SiegeMap.findOne( { _id: req.body.id } )
    .then(siegemap => {
        if(siegemap === null){
            res.status(401).send({ Error :'Siegemap does not exist.'})
        }
        else {
            siegemap.delete()
            .then(() => {
                res.status(200).send({ Message :'Siegemap succesfully removed.'})
                console.log('>>>siegemap removed')
            });
        }
    });
};

module.exports = {
    getAll,
    create,
    edit,
    remove
}