const UserController = require('../src/controllers/user_controller');

module.exports = (app) => {
    app.get('*', function(req, res) {
        res.contentType('application/json');
        res.status(200).send({ message: "Welcome to siegewiki." });
    });

    //create a new user with 'name, password'
    app.post('/api/user/', UserController.create);
};