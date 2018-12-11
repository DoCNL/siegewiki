const Season = require('../models/season');
const Operator = require('../models/operator');
const defS = require('../../config/default_data');

//todo: add operators to seasons

function getAll(req, res) {
    Operator.find({}, {__v: 0})
        .then(operators => {
            res.status(200).send(operators);
            console.log('>>operators returned');
        });
};

function create(req, res) {
    Operator.create({
        name: req.body.name,
        description: req.body.description,
        imageLink: req.body.imageLink,
        season: defS.getDefaultSeason,
        side: req.body.side
    })  
    .then(() =>
        res.status(200).send({Message: "Operator created succesfully."}),
        console.log('>>operator created'))
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'An operator with this name already exists.'});
            } else {
                res.status(401).send({err});
            }
    });
};

function edit(req, res) {
    Operator.findOne( { _id: req.body._id } )
    .then(operator => {
        if(operator === null){
            res.status(401).send({ Error :'Operator does not exist.'})
        }
        else {
            let nameToSet = null;
            let descToSet = null;
            let imgToSet = null;
            let sideToSet = null;
            if (req.body.name === '' || req.body.name === null) nameToSet = operator.name
            if (req.body.description === '' || req.body.description === null) descToSet = operator.description
            if (req.body.imageLink === '' || req.body.imageLink === null) imgToSet = operator.imageLink
            if (req.body.side === '' || req.body.side === null) sideToSet = operator.side
            
            operator.set({
                name: req.body.name || nameToSet,
                description: req.body.description || descToSet,
                imageLink: req.body.imageLink || imgToSet,
                season: defS.getDefaultSeason,
                side: req.body.side || sideToSet
            })
            operator.save()
            .then(() => {
                res.status(200).send({Message: "Operator edited succesfully"})
                console.log('>>>operator edited')
            })
            .catch((err) => res.status(401).send({err}));
        }
    });
};

function remove(req, res) {
    Operator.findOne( { _id: req.body.id } )
    .then(operator => {
        if(operator === null){
            res.status(401).send({ Error :'Operator does not exist.'})
        }
        else {
            operator.delete()
            .then(() => {
                res.status(200).send({ Message :'Operator succesfully removed.'})
                console.log('>>>operator removed')
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