const db = require("../data/config")
const bcrypt = require("bcryptjs")
module.exports = {
    add,
    findItem,
    getAll,
}

function add(item) {
    return db("items").insert(item)
}

function findItem(item) {
    return db("items").where({title: `${item.title}`}).first()
}

function getAll() {
    return db("items").select()
}