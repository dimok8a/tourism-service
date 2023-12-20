const {PlaceType} = require("../models/models")
const ApiError = require("../error/ApiError")
class PlaceTypesController {
    async getAll(req, res)
    {
        const placeTypes = await PlaceType.findAll();
        return res.json(placeTypes)
    }

    async create(req, res)
    {
        const {name} = req.body
        const placeType = await PlaceType.create({name})
        return res.json(placeType)
    }
}

module.exports = new PlaceTypesController()
