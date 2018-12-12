// const Season = require('../src/models/season');
// const Operator = require('../src/models/operator');
// const SiegeMap = require('../src/models/siegemap');

// function addDefaultSeason() {
//     Season.findOne( { name: 'Default' } )
//         .then(season => {
//             if(season === null){
//                 Season.create({
//                     name: 'Default',
//                     description: 'This is the default season',
//                     imageLink: 'defaultlink',
//                     year: 0
//                 }) 
//             } else {
//                 season.delete()
//                 .then(() => addDefaultSeason());
//             }
//         });
// }

// function getDefaultSeason() {
//     Season.findOne( { name: 'Default' } )
//         .then(season => {
//             return season
//         });
// }

// function addDefaultOperator() {
//     Operator.findOne( { name: 'Default' } )
//         .then(operator => {
//             if(operator === null){
//                 Operator.create({
//                     name: 'Default',
//                     description: 'This is the default operator',
//                     imageLink: 'defaultlink',
//                     season: getDefaultSeason(),
//                     side: 'Attacker'
//                 }) 
//             } else {
//                 operator.delete()
//                 .then(() => addDefaultOperator());
//             }
//         });
// }

// function getDefaultOperator() {
//     Operator.findOne( { name: 'Default' } )
//         .then(op => {
//             return op;
//         });
// }

// function addDefaultSiegeMap() {
//     SiegeMap.findOne( { name: 'Default' } )
//         .then(map => {
//             if(map === null){
//                 SiegeMap.create({
//                     name: 'Default',
//                     description: 'This is the default map',
//                     imageLink: 'defaultlink',
//                     season: getDefaultSeason(),
//                     rankedAvailability: false
//                 }) 
//             } else {
//                 map.delete()
//                 .then(() => addDefaultSiegeMap());
//             }
//         });
// }

// function getDefaultSiegeMap() {
//     SiegeMap.findOne( { name: 'Default' } )
//         .then(map => {
//             return map;
//         });
// }

// module.exports = {
//     addDefaultSeason,
//     getDefaultSeason,
//     addDefaultOperator,
//     getDefaultOperator,
//     addDefaultSiegeMap,
//     getDefaultSiegeMap
// }

const Season = require('../src/models/season');

function addDefaultSeason() {
    Season.findOne( { name: 'Default' } )
        .then(season => {
            if(season === null){
                Season.create({
                    name: 'Default',
                    description: 'This is the default season',
                    imageLink: 'defaultlink',
                    year: 0
                }) 
            } else {
                season.delete()
                .then(() => addDefaultSeason());
            }
        });
}

function getDefaultSeason() {
    Season.findOne( { name: 'Default' } )
        .then(season => {
            return season
        });
}

module.exports = {
    addDefaultSeason,
    getDefaultSeason
}