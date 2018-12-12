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
            season.save()
            .then(() => {
                res.status(200).send({Message: "Season edited succesfully"})
                console.log('>>season edited')
            })
            .catch((err) => res.status(401).send({err}));
        }
    });
};

function recreate(res, season, operatorAdd, mapAdd) {
    console.log(season._id + season)
    Season.findOne({ _id: season._id })
    .then((foundSeason) => {
        foundSeason.delete()
        .then(() => {
            Season.create({
                _id: season._id,
                __v: season.__v,
                name: season.name,
                description: season.description,
                imageLink: season.imageLink,
                year: season.year,
                operator: operatorAdd,
                map: mapAdd
            }).then(season => { res.status(200).send({Message: "Populated season succesfully"}) })
        })
    })
}

function populate(req, res) {
    Season.findOne( { _id: req.body._id } )
    .then(season => {
        if(season === null){
            res.status(401).send({ Error :'Season does not exist.'})
        }
        else { 
            let operatorName = req.body.operatorName;
            let siegeMapName = req.body.siegeMapName;
            let foundOperator = new Operator();
            let foundMap = new Map();
            let newSeason = new Season();

            Operator.findOne({ name: operatorName })
                .then(resultOp => {
                    foundOperator = resultOp;
                })
                .catch((err) => res.status(401).send({err}));

                SiegeMap.findOne({ name: siegeMapName })
                .then(resultMap => {
                    foundMap = resultMap;
                })
                .catch((err) => res.status(401).send({err}));
                newSeason = recreate(res, season, foundOperator, foundMap)
        }
    });
};

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
    remove,
    populate
}