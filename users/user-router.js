const express = require("express")
const router = express.Router()
const authModel = require("../auth/auth-model")
const restrict = require("../middleware/restrict")

router.get("/", async (req, res, next) => {
    try{
        res.status(200).json({
            message: "Welcome to users endpoint!"
        })
    } catch(err) {
        next(err)
    }
})

router.get("/users/all", restrict(), async (req, res, next) => {
    try {
        const allUsers = await authModel.getAll()
        res.status(200).json(allUsers)
    } catch(err) {
        next(err)
    }
})

module.exports = router