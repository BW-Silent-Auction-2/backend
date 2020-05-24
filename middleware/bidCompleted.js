const express = require("express")
const auctionModel = require("../users/auction-model")

module.exports = bidCompleted

function bidCompleted() {
    return async (req, res, next) => {
        try {
            // Check to see if time left in ms is <= 0
            // If yes, then change the boolean to completed
            const itemId = {
                id: req.params.id 
            }
            const item = await auctionModel.findItemById(itemId.id)
            if (item.timeDurationInMs <= 0) {
                const itemTimesUp = await auctionModel.statusUpdate(item)
                return res.status(401).json({
                    errorMessage: "This auction has ended."
                })
            }

            next()
        } catch(err) {
            next(err)
        }
    }
}