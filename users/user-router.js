const express = require("express")
const router = express.Router()
const authModel = require("../auth/auth-model")
const {restrict} = require("../middleware/restrict")

router.get("/", async (req, res, next) => {
    try{
        res.status(200).json({
            message: "Welcome to users endpoint!"
        })
    } catch(err) {
        next(err)
    }
})

router.get("/user/:id", restrict(), async (req, res, next) => {
    try {
        const user = await authModel.findUserById(req.params.id)
        if(!user) {
            return res.status(401).json({
                errorMessage: "There's no user associated with this id"
            })
        }
        res.status(200).json(user)
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