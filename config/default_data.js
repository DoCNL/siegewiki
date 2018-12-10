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