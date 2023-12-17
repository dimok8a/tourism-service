const Router = require('express')
const router = new Router()
const photoController = require('../controllers/photoController')

router.get("/:placeId", photoController.getByPlaceId)
router.post("/", photoController.create)


module.exports = router
