
const knex = require('knex');

// We can actually just skip DB_ENV and just set it knex(knexfile[process.env.NODE_ENV]) since
// Heroku set it as production as default



const knexfile = require("../knexfile")
console.log("This is ", process.env.NODE_ENV)
module.exports = knex(knexfile[process.env.NODE_ENV])