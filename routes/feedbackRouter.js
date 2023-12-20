const Router = require('express')
const router = new Router()
const feedbackController = require('../controllers/feedbackController')
router.get("/:placeId", feedbackController.getByPlaceId)
router.post("/", feedbackController.create)


module.exports = router
