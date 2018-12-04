const Season = require('../models/season');
const Operator = require('../models/operator');
const SiegeMap = require('../models/siegemap');

function create(res, req) {
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
}

module.exports = {
    create
}