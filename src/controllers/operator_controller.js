const Season = require('../models/season');
const Operator = require('../models/operator');
var auth = require('./auth_controller');

//no authentication required
function getAll(req, res) {
    Operator.find({})
        .then(operators => {
            res.status(200).send(operators);
            console.log('>>operators returned');
        });
};

//requires a valid token
function create(req, res) {
    auth.validateToken(req, res);
    Operator.create({
        name: req.body.name,
        description: req.body.description,
        imageLink: req.body.imageLink,
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

//requires a valid token
function edit(req, res) {
    auth.validateToken(req, res);
    Operator.findOne( { _id: req.body.id } )
    .then(operator => {
        if(operator === null){
            res.status(401).send({ Error :'Operator does not exist.'})
        }
        else {
            operator.set({
                name: req.body.name,
                description: req.body.description,
                imageLink: req.body.imageLink,
                side: req.body.side
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

//requires a valid token
function remove(req, res) {
    auth.validateToken(req, res);
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