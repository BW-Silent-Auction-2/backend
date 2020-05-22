const express = require("express")
const server = express()
const authRouter = require("./auth/auth-router")
const userRouter = require("./users/user-router")
const PORT = 4000

server.use(express.json())


server.get("/", (req, res) => {
    res.json({
        message: "Welcome to our server!"
    })
})

server.use("/auth/users", authRouter)
server.use("/", userRouter)

server.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})