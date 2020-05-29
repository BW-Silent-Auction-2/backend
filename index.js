const express = require("express")
const cors = require("cors")
const server = express()
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")
const auctionRouter = require("./users/auction-router")
const PORT = process.env.PORT || 4000

server.use(express.json())
server.use(cors())

server.get("/", (req, res) => {
    res.json({
        message: "Welcome to our server!"
    })
})

server.use("/auth/users", authRouter)
server.use("/", userRouter)
server.use("/auth/users/auction", auctionRouter)

if (!module.parent) {
server.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})
}

module.exports = server