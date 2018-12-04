const UserController = require('../src/controllers/user_controller');
const SeasonController = require('../src/controllers/season_controller');
const OperatorController = require('../src/controllers/operator_controller');

module.exports = (app) => {
    //
    //User routes
    //
    //create a new user with 'name, password'
    app.post('/api/user/', UserController.create);
    //change password of an existing user with 'name, password, newPassword'
    app.put('/api/user/', UserController.edit);
    //remove a user from the database with 'name, password'
    app.delete('/api/user', UserController.remove);

    //
    //Season routes
    //
    //create a new season with 'name, description, imageLink, year'
    app.post('/api/season', SeasonController.create);
    //edit an existing season with 'id, name, description, imageLink, year'
    app.put('/api/season', SeasonController.edit);
    //remove an existing season with 'name'
    app.delete('/api/season', SeasonController.remove);

    //
    //Operator routes
    //
    //create a new operator with 'name, description, imageLink, side'
    app.post('/api/operator', OperatorController.create);
};