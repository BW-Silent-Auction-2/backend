const express = require("express")
const router = express.Router()
const auctionModel = require("./auction-model")
const authModel = require("../auth/auth-model")
const {sessions, restrict} = require("../middleware/restrict")
const tools = require("../tools/tools")
////////////////////////////////////////////
//--------------CREATE ITEM--------------//
router.post("/create", restrict(), async (req, res, next) => {
    try {
        const seller = await authModel.find(sessions)
        const item = {
            title: req.body.title,
            description: req.body.description,
            bid: req.body.initialPrice,
            initialPrice: req.body.initialPrice,
            timeSubmitted: Date.now(),
            timeEnd: req.body.timeEnd,
            timeDuration: "",
            sellerId: seller.id
            
        }
        
        // Check time format
        const timeFormatValid = await tools.validateDate(item.timeEnd)
        if (!timeFormatValid) {
            return res.status(401).json({
                message: "Please enter date with the following format MM/DD/YYYY"
            })
        }

        // Add time duration to item
        item.timeDuration = tools.calBidDuration(item.timeEnd, item.timeSubmitted)

        // Check preconditions
        if (!item.title ||
            !item.description ||
            !item.initialPrice ||
            !item.timeEnd) {
                return res.status(428).json({
                    message: "Missing required fields"
                })
            }

        // Check if item exists
        const itemExists = await auctionModel.findItem(item)
        if (itemExists) {
            return res.status(401).json({
                errorMessage: "Item title already taken"
            })
        }

        const addItem = await auctionModel.add(item)
        res.status(201).json(addItem)
    } catch(err) {
        console.log(err)
        next()
    }
})

/////////////////////////////////////////////
//--------------GET ALL ITEMS--------------//
router.get("/all", restrict(), async (req, res, next) => {
    try {
        const allItems = await auctionModel.getAll()
        res.status(200).json(allItems)
    } catch(err) {
        console.log(err)
        next(err)
    }
})



module.exports = router