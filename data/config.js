const enviroment = process.env.NODE_ENV || 'development';
const configuration = require("../knexfile")[enviroment]
const database = require('knex')(configuration)

module.exports = database