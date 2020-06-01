const db = require("../data/config")
const authModel = require('../auth/auth-model')
const bcrypt = require("bcryptjs")
module.exports = {
    add,
    findItem,
    getAll,
    findItemById,
    bidUpdate,
    statusUpdate,
    allBidsFromUser,
    delItem
}

function add(item) {
    return db("items").insert(item).returning("id")
}

function findItem(item) {
    return db("items").where({title: `${item.title}`}).first()
}

function findItemById(id) {
    return db("items").where({id: id}).first()
}

function getAll() {
    return db("items").select()
}

async function bidUpdate(item) {
    const findUser = await authModel.find(item)
    console.log("this is find user", findUser)
    const oldItem = await findItemById(item.id)
    const oldBid = oldItem.bid
    const newBid = oldBid + item.bid
    return db("items").where({id: item.id}).update({bid: newBid, bidderId: findUser.id})
}

function statusUpdate(item) {
    return db("items").where({id: item.id}).update({ completed: 1 })
}

function allBidsFromUser(id) {
    return db("items").where({bidderId: id})
}

function delItem(id) {
    return db("items").where({ id: id}).del()
}