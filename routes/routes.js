const UserController = require('../src/controllers/user_controller');

module.exports = (app) => {
    //create a new user with 'name, password'
    app.post('/api/user/', UserController.create);
    //change password of an existing user with 'name, password, newPassword'
    app.put('/api/user/', UserController.edit);
    //remove a user from the database with 'name, password'
    app.delete('/api/user', UserController.remove);
};