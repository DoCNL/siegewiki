var env = {
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'siege_db'
}

var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
    'mongodb://localhost/' + env.dbDatabase

var dburl_dev = 'mongodb://sabok:Potato1@ds061938.mlab.com:61938/siege_db';

var connectionMethod = process.env.NODE_ENV === 'production' ?
    'heroku' : 'localhost:3000'

module.exports = {
    env,
    dburl,
    dburl_dev,
    connectionMethod
};