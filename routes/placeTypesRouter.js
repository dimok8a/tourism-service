const Router = require('express')
const router = new Router()
const placeTypesController = require('../controllers/placeTypesController')
const checkRole = require('../middleware/checkRoleByMiddleware')
router.get("/", placeTypesController.getAll)
router.post("/", checkRole, placeTypesController.create)

module.exports = router
