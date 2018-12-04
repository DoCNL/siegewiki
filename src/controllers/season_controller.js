const Season = require('../models/season');
const Operator = require('../models/operator');
const SiegeMap = require('../models/siegemap');

function getAll(req, res) {
    Season.find({})
        .then(seasons => {
            res.status(200).send(seasons);
        });
};


function create(req, res) {
    Season.create({
        name: req.body.name,
        description: req.body.description,
        imageLink: req.body.imageLink,
        year: req.body.year
    })  
    .then(() =>
        res.status(200).send({Message: "Season created succesfully."}),
        console.log('>>season saved'))
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'Seasonname is already in use.'});
            } else {
                res.status(401).send({err});
            }
    });
};

function edit(req, res) {
    Season.findOne( { _id: req.body.id } )
    .then(season => {
        if(season === null){
            res.status(401).send({ Error :'Season does not exist.'})
        }
        else {
            Operator.findById(req.body.operatorId)
            .then(operator => {
                season.set({
                    name: req.body.name,
                    description: req.body.description,
                    imageLink: req.body.imageLink,
                    year: req.body.year
                })
                season.operators.push(operator);
                season.save()
                .then(() => res.status(200).send({Message: "Season edited succesfully"}))
                .catch((err) => res.status(401).send({err}));
            })
            .catch(err => {
                res.status(401).send(err)
            });
        }
    });
};

function remove(req, res) {
    Season.findOne( { name: req.body.name } )
    .then(season => {
        if(season === null){
            res.status(401).send({ Error :'Season does not exist.'})
        }
        else {
            season.delete()
            .then(() => res.status(200).send({ Message :'Season succesfully removed.'}));
        }
    });
};

module.exports = {
    getAll,
    create,
    edit,
    remove
}