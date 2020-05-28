const knex = require('knex');

const env = process.env.DB_ENV || 'development'

const knexfile = require("../knexfile")

module.exports = knex(knexfile[process.env.NODE_ENV])