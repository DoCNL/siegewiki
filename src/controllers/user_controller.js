const User = require('../models/user');
var bcrypt = require('bcryptjs');
var auth = require('./auth_controller');

function create(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name: req.body.name,
        password: hashedPassword
    })  
    .then(() =>
        res.status(200).send({Message: "User created succesfully."}),
        console.log('>>user saved'))
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'Username is taken.'});
            } else {
                res.status(401).send({err});
            }
    });
};

function edit(req, res) {
    User.findOne( { name: req.body.name } )
    .then(user => {
        if(user === null){
            res.status(401).send({ Error :'User does not exist.'})
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            res.status(401).send({ Error :'Current password does not match.'})
        }
        else {
            user.set(password, req.body.newPassword)
            user.save()
            .then(() => res.status(200).send({Message: "password changed succesfully"}))
            .catch((err) => res.status(401).send({err}));
        }
    });
};

function remove(req, res) {
    User.findOne( { name: req.body.name } )
    .then(user => {
        if(user === null){
            res.status(401).send({ Error :'User does not exist.'})
        }
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            res.status(401).send({ Error :'Current password does not match.'})
        }
        else {
            user.delete()
            .then(() => res.status(200).send({ Message :'User succesfully removed.'}));
        }
    });
};

module.exports = {
    create,
    edit,
    remove
}