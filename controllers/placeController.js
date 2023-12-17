const {Place, Feedback, Photo} = require("../models/models")
const {PlaceType} = require("../models/models")
const ApiError = require("../error/ApiError")
class PlaceController {
    async getAll(req, res, next)
    {
        try {
            let {placeTypeId, limit, page} = req.query
            page = parseInt(page) || 1
            limit = parseInt(limit) || 20
            const offset = ((page-1)*limit)
            const allPlaces = await Place.findAll(
                {
                    where: {placeTypeId}, limit, offset, subQuery:false,
                    include: [{model: Photo, as: "image"}]
                },
            )
            return res.json(allPlaces)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getById(req, res, next)
    {
        try {
            let {id} = req.params
            const place = await Place.findOne({
                where: {id},
                include: [
                    {model: Feedback, as: "feedbacks"},
                    {model: Photo, as: "photo"}
                ]
            })
            return res.json(place)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async create(req, res, next)
    {
        try {
            const {name, description, phone_number, website, address, longitude, latitude, placeTypeId} = req.body
            const newPlace = await Place.create({name, description, phone_number, website, address, longitude, latitude, placeTypeId} );
            return res.json(newPlace)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

}

module.exports = new PlaceController()
