const express = require("express")
const router = express.Router()
const auctionModel = require("./auction-model")
const authModel = require("../auth/auth-model")
const {sessions, restrict} = require("../middleware/restrict")
const bidCompleted = require("../middleware/bidCompleted")
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
            timeDurationInMs: null,
            sellerId: seller.id,
            imgUrl: req.body.imgUrl           
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

        // Add time duration in ms
        const timeDurationInMs = tools.timeLeftInMs(item.timeEnd, item.timeSubmitted)
        item.timeDurationInMs = timeDurationInMs

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
router.get("/all", async (req, res, next) => {
    try {
        const allItems = await auctionModel.getAll()
        res.status(200).json(allItems)
    } catch(err) {
        console.log(err)
        next(err)
    }
})

/////////////////////////////////////////////
//--------------GET ITEM BY ID--------------//
router.get("/:id", restrict(), async (req, res, next) => {
    try {
        const item = await auctionModel.findItemById(req.params.id)
        if (!item) {
            return res.status(401).json({
                errorMessage: "There's no item associate with this id."
            })
        }
        res.status(200).json(item)
    } catch(err) {
        next(err)
    }
})

/////////////////////////////////////////////
//--------------BID ON ITEM--------------//
router.put("/:id/bid", restrict(), bidCompleted(), async (req, res, next) => {
    try {
        const bid = {
            id: req.params.id,
            bid: req.body.bid,
            username: sessions.username
        }
        const auctionItem = await auctionModel.findItemById(bid.id)
        const auctionItemInitialPrice = auctionItem.initialPrice
        if ((auctionItemInitialPrice * 5 / 100) > bid.bid) {
            return res.status(401).json({
                errorMessage: "Minimum bid increase at 5%"
            })
        }
        const bidUpdate = await auctionModel.bidUpdate(bid)
        const findThatItem = await auctionModel.findItemById(req.params.id)
        res.status(200).json(findThatItem)

    } catch(err) {
        next(err)
    }
})

/////////////////////////////////////////////
//--------------DELETE ITEM---------------//
router.delete("/:id", restrict(), async (req, res, next) => {
    try {
        const deleteItem = await auctionModel.delItem(req.params.id)
        if (!deleteItem) {
            return res.status(404).json({
                errorMessage: "item not found"
            })
        }
        res.status(200).json({
            message: "Item deleted"
        })
    } catch(err) {
        next(err)
    }
})


module.exports = router