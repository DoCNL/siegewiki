const UserController = require('../src/controllers/user_controller');
const SeasonController = require('../src/controllers/season_controller');

module.exports = (app) => {
    //create a new user with 'name, password'
    app.post('/api/user/', UserController.create);
    //change password of an existing user with 'name, password, newPassword'
    app.put('/api/user/', UserController.edit);
    //remove a user from the database with 'name, password'
    app.delete('/api/user', UserController.remove);

    //create a new season with 'name, description, imageLink, year'
    app.post('/api/season', SeasonController.create);
    //edit an existing season with 'id, name, description, imageLink, year'
    app.put('/api/season', SeasonController.edit);
};