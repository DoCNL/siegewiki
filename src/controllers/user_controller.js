const User = require('../models/user');

function create(req, res){
    User.create({
        name: req.body.name,
        password: req.body.password
    })  
    .then(() =>
        res.status(200).send({Message: "User created succesfully."}),
        console.log('user saved'))
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'Username is taken.'});
            } else {
                res.status(401).send({ Error: err});
            }
    });
};

module.exports = {
    create
}