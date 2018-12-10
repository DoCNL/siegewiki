const UserController = require('../src/controllers/user_controller');
const SeasonController = require('../src/controllers/season_controller');
const OperatorController = require('../src/controllers/operator_controller');
const MapController = require('../src/controllers/siegemap_controller');
const AuthController = require('../src/controllers/auth_controller');

module.exports = (app) => {
    //
    //Login routes
    //
    //create a new user with 'name, password'
    app.post('/api/user/register', UserController.create);
    //create a token with 'name, password'
    app.post('/api/user/login', AuthController.login);
    
    //
    //User routes
    //
    //change password of an existing user with 'name, password, newPassword'
    app.put('/api/user/', AuthController.validateToken, UserController.edit);
    //remove a user from the database with 'name, password'
    app.delete('/api/user/', AuthController.validateToken, UserController.remove);

    //
    //Season routes
    //
    //get all seasons
    app.get('/api/seasons/', SeasonController.getAll);
    //create a new season with 'name, description, imageLink, year'
    app.post('/api/season/', AuthController.validateToken, SeasonController.create);
    //edit an existing season with 'id, name, description, imageLink, year'
    app.put('/api/season/', AuthController.validateToken, SeasonController.edit);
    //remove an existing season with 'name'
    app.delete('/api/season/', AuthController.validateToken, SeasonController.remove);

    //
    //Operator routes
    //
    //get all operators
    app.get('/api/operators/', OperatorController.getAll);
    //create a new operator with 'name, description, imageLink, side'
    app.post('/api/operator/', AuthController.validateToken, OperatorController.create);
    //edit an existing operator with 'id, name, description, imageLink, side'
    app.put('/api/operator/', AuthController.validateToken, OperatorController.edit);
    //remove an existing operator with 'id'
    app.delete('/api/operator/', AuthController.validateToken, OperatorController.remove);

    //
    //Siegemap routes
    //
    //get all siegemaps
    app.get('/api/siegemaps/', MapController.getAll);
    //create a new siegemap with 'name, description, imageLink, ranked'
    app.post('/api/siegemap/', AuthController.validateToken, MapController.create);
    //edit an existing siegemap with 'id, name, description, imageLink, ranked'
    app.put('/api/siegemap/', AuthController.validateToken, MapController.edit);
    //remove an existing siegemap with 'id'
    app.delete('/api/siegemap/', AuthController.validateToken, MapController.remove);
};