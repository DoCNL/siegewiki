const Season = require('../models/season');
const Operator = require('../models/operator');
const SiegeMap = require('../models/siegemap');

//todo: refactor the way operators are added to seasons, add maps to seasons

function getAll(req, res) {
    Season.find({}, {__v: 0})
        .then(seasons => {
            res.status(200).send(seasons);
            console.log('>>seasons returned');
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
        console.log('>>season created'))
    .catch((err) => {
            if (err.name == 'MongoError' && err.code == 11000) {
                res.status(401).send({ Error: 'Seasonname is already in use.'});
            } else {
                res.status(401).send({err});
            }
    });
};

function edit(req, res) {
    Season.findOne( { _id: req.body._id } )
    .then(season => {
        if(season === null){
            res.status(401).send({ Error :'Season does not exist.'})
        }
        else {
            let nameToSet = req.body.name;
            let descToSet = req.body.description;
            let imgToSet = req.body.imageLink;
            let yearToSet = req.body.year;
            if (req.body.name === '' || req.body.name === null) nameToSet = season.name
            if (req.body.description === '' || req.body.description === null) descToSet = season.description
            if (req.body.imageLink === '' || req.body.imageLink === null) imgToSet = season.imageLink
            if (req.body.year === '' || req.body.year === null) sideToSet = season.year
            
            season.set({
                name: nameToSet,
                description: descToSet,
                imageLink: imgToSet,
                year: yearToSet
            })
            .then(() => {
                res.status(200).send({Message: "Season edited succesfully"})
                console.log('>>season edited')
            })
            .catch((err) => res.status(401).send({err}));
        }
    });
};


 
// Operator.findById(req.body.operatorId)
// .then(operator => {
//     season.set({
//         name: req.body.name,
//         description: req.body.description,
//         imageLink: req.body.imageLink,
//         year: req.body.year
//     })
//     season.operators.push(operator);
//     season.save()
//     .then(() => {
//         res.status(200).send({Message: "Season edited succesfully"})
//         console.log('>>season edited')
//     })
//     .catch((err) => res.status(401).send({err}));
// })
// .catch(err => {
//     res.status(401).send(err)
// });
// }
// });
// };
function remove(req, res) {
    Season.findOne( { _id: req.headers._id } )
    .then(season => {
        if(season === null){
            res.status(401).send({ Error :'Season does not exist.'})
        }
        else {
            season.delete()
            .then(() => {
                res.status(200).send({ Message :'Season succesfully removed.'})
                console.log('>>season removed')
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