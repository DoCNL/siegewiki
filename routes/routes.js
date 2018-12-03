module.exports = (app) => {
    app.get('*', function(req, res) {
        res.contentType('application/json');
        res.status(200).send({ message: "Welcome to siegewiki." });
    });

};