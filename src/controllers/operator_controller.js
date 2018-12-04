const Season = require('../models/season');
const Operator = require('../models/operator');

function getAll(req, res) {
    Operator.find({})
        .then(operators => {
            res.status(200).send(operators);
        });
};

function create(req, res) {
    console.log(req.body);
    Operator.create({
        name: req.body.name,
        description: req.body.description,
        imageLink: req.body.imageLink,
        side: req.body.side
    })  
    .then(() =>
        res.status(200).send({Message: "Operator created succesfully."}),
        console.log('>>operator saved'))
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'An operator with this name already exists.'});
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
            season.set({
                name: req.body.name,
                description: req.body.description,
                imageLink: req.body.imageLink,
                year: req.body.year
            })
            season.save()
            .then(() => res.status(200).send({Message: "Season edited succesfully"}))
            .catch((err) => res.status(401).send({err}));
        }
    });
};

module.exports = {
    getAll,
    create,
    edit
}