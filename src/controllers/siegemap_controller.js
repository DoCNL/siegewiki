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

function getOneById(req, res) {
    SiegeMap.findById(req.params.id)
        .then(siegemap => {
            if (siegemap === null) {
                res.status(401).send({ Error: 'SiegeMap does not exist.' })
            }
            else {
                res.status(200).send(siegemap);
                console.log('>>siegeMap returned');
            }
            
        })
}

function create(req, res) {
    SiegeMap.create({
        name: req.body.name,
        description: req.body.description,
        imageLink: req.body.imageLink,
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
    SiegeMap.findOne( { _id: req.params.id } )
    .then(siegemap => {
        if(siegemap === null){
            res.status(401).send({ Error :'Siegemap does not exist.'})
        }
        else {
            let nameToSet = req.body.name;
            let descToSet = req.body.description;
            let imgToSet = req.body.imageLink;
            let avToSet = req.body.rankedAvailability;
            if (req.body.name === '' || req.body.name === null) nameToSet = siegemap.name;
            if (req.body.description === '' || req.body.description === null) descToSet = siegemap.description;
            if (req.body.imageLink === '' || req.body.imageLink === null) imgToSet = siegemap.imageLink;
            if (req.body.rankedAvailability === '' || req.body.rankedAvailability === null) avToSet = false;
            
            siegemap.set({
                name: nameToSet,
                description: descToSet,
                imageLink: imgToSet,
                season: defS.getDefaultSeason(),
                rankedAvailability: avToSet
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
    SiegeMap.findOne( { _id: req.params.id } )
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
    getOneById,
    create,
    edit,
    remove
}