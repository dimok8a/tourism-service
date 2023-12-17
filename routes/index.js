const Router = require('express')

const router = new Router()
const placeRouter = require("./placeRouter")
const userRouter = require("./userRouter")
const placeTypesRouter = require("./placeTypesRouter")
const photoRouter = require("./photoRouter")
const feedbackRouter = require("./feedbackRouter")

router.use('/user', userRouter)
router.use('/place', placeRouter)
router.use('/photo', photoRouter)
router.use('/placeTypes', placeTypesRouter)
router.use('/feedback', feedbackRouter)

module.exports = router
