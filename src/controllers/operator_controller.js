const Season = require('../models/season');
const Operator = require('../models/operator');
const defS = require('../../config/default_data');

//todo: add operators to seasons

function getAll(req, res) {
    Operator.find({}, { __v: 0 })
        .then(operators => {
            res.status(200).send(operators);
            console.log('>>operators returned');
        });
};

function getOne(req, res) {
    Operator.findOne({ _id: req.params.id })
        .then(operator => {
            if (operator === null) {
                res.status(401).send({ Error: 'Operator does not exist.' })
            }
            else {
                res.status(200).send(operator);
                console.log('>>operator returned');
            }
        })
}

function create(req, res) {
    Operator.create({
        name: req.body.name,
        description: req.body.description,
        imageLink: req.body.imageLink,
        side: req.body.side
    })
        .then(() =>
            res.status(200).send({ Message: "Operator created succesfully." }),
            console.log('>>operator created'))
        .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'An operator with this name already exists.' });
            } else {
                res.status(401).send({ err });
            }
        });
};

function edit(req, res) {
    Operator.findOne({ _id: req.body._id })
        .then(operator => {
            if (operator === null) {
                res.status(401).send({ Error: 'Operator does not exist.' })
            }
            else {
                let nameToSet = req.body.name;
                let descToSet = req.body.description;
                let imgToSet = req.body.imageLink;
                let sideToSet = req.body.side;
                if (req.body.name === '' || req.body.name === null) nameToSet = operator.name
                if (req.body.description === '' || req.body.description === null) descToSet = operator.description
                if (req.body.imageLink === '' || req.body.imageLink === null) imgToSet = operator.imageLink
                if (req.body.side === '' || req.body.side === null) sideToSet = operator.side

                operator.set({
                    name: nameToSet,
                    description: descToSet,
                    imageLink: imgToSet,
                    season: defS.getDefaultSeason,
                    side: sideToSet
                })
                operator.save()
                    .then(() => {
                        res.status(200).send({ Message: "Operator edited succesfully" })
                        console.log('>>>operator edited')
                    })
                    .catch((err) => res.status(401).send({ err }));
            }
        });
};

function remove(req, res) {
    Operator.findOne({ _id: req.headers._id })
        .then(operator => {
            if (operator === null) {
                res.status(401).send({ Error: 'Operator does not exist.' })
            }
            else {
                operator.delete()
                    .then(() => {
                        res.status(200).send({ Message: 'Operator succesfully removed.' })
                        console.log('>>>operator removed')
                    });
            }
        });
};

module.exports = {
    getAll,
    getOne,
    create,
    edit,
    remove
}