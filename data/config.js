
const knex = require('knex');

// We can actually just skip DB_ENV and just set it knex(knexfile[process.env.NODE_ENV]) since
// Heroku set it as production as default

const env = process.env.DB_ENV || 'development'

const knexfile = require("../knexfile")

module.exports = knex(knexfile[env])