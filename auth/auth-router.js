const express = require("express")
const router = express.Router()
const authModel = require("./auth-model")
const restrict = require("../middleware/restrict")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

router.get("/", async (req, res, next) => {
    try{
        res.status(200).json({
            message: "Welcome to users endpoint!"
        })
    } catch(err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {

    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastname: req.body.lastName,
            userType: req.body.userType
        }

        //Check if user exists
        const userExist = await authModel.find(user)
        console.log("userExist: ", userExist)
        if (userExist) {
            return res.status(401).json({
                errorMessage: "Username already taken."
            })
        }

        //Check if email exists
        const emailExist = await authModel.find(user)
        if (emailExist) {
            res.status(400).json({
                errorMessage: "Email already taken."
            })
        }
        
        const addUser = await authModel.add(user)
       res.status(201).json(addUser) 
    } catch (err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    const authError = {
        message: "Invalid credentials"
    }
    try {
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        //Check if username exists
        const userExist = await authModel.find(user)
        if (!userExist) {
            res.status(401).json(authError)
        }

        //Check if password is valid
        const passwordValid = await bcrypt.compare(user.password, userExist.password)
        if (!passwordValid) {
            res.status(401).json(authError)
        }

        const tokenPayload = {
            userId: userExist.id,
        }

        res.cookie('token', jwt.sign(tokenPayload, "Secret string!!!"))

        res.status(200).json({
            message: "You've logged in."
        })
    } catch (err) {
        next(err)
    }
})

router.post("/logout", async (req, res, next) => {
    try {
        let token = req.headers.cookie
        if (!token) {
            return res.status(401).json({
                errorMessage: "You haven't logged in."
            })
        }
        res.cookie('token', Math.random())
        res.status(200).json({
            message: "You've logged out."
        })
    } catch(err) {
        next(err)
    }
})

router.delete("/", async (req, res,next) => {
    try {
        //Check if user exists
        const user = {
            username: req.body.username
        }
        const deleteUser = await authModel.del(user)
        res.status(204).json({
            message: "So sad to see you gone!"
        })
    } catch(err) {
        next(err)
        
    }
})

module.exports = router