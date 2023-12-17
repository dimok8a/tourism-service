const uuid = require('uuid')
const {Photo} = require("../models/models");
const ApiError = require("../error/ApiError")
const path = require('path')
class PhotoController {
    async getByPlaceId(req, res)
    {

    }

    async create(req, res, next)
    {
        try {
            const {placeId} = req.body
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg"
            photo.mv(path.resolve(__dirname, '..', 'static', fileName))
            const newPhoto = await Photo.create({"photo": fileName, placeId})
            return res.json(newPhoto)
        } catch (e) {

            return res.json(ApiError.badRequest(e.message))
        }


    }
}

module.exports = new PhotoController()
