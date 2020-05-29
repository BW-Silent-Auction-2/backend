const express = require("express")
const jwt = require("jsonwebtoken")

const sessions = {}

function restrict() {
    return async (req, res, next) => {
        try {
            //Checking sessions
            if (!sessions.username) {
                return res.status(401).json({
                    message: "Please log in."
                })
            }
            //Checking token on cookie
            let token = req.headers.cookie
            if (!token) {
                return res.status(401).json({
                    errorMessage: "Please log in."
                })
            }
            token = token.replace("token=", "")
            
            jwt.verify(token, "Secret string!!!", (err, decodedPayload) => {
                if (err) {
                    return res.status(401).json({
                        errorMessage: "Please log in again."
                    })
                }
                req.token = decodedPayload
                next()
            })
            
        } catch(err) {
            next(err)
        }
    }
}

module.exports = {
    sessions,
    restrict
}