const db = require("../data/config")
const bcrypt = require("bcryptjs")
module.exports = {
    add,
    find,
    findEmail,
    getAll,
    del,
}

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)
    return db("users").insert(user)
}

function find(user) {
    return db("users").where({username: `${user.username}`}).first()
}

function findEmail(user) {
    return db("users").where({email: `${user.email}`}).first()
}

function getAll() {
    return db("users").select('*')
}

function del(user) {
    return db("users").where({username: `${user.username}`}).del()
}