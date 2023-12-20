const {Place, Feedback, Photo, PlaceType, User} = require("../models/models")
const ApiError = require("../error/ApiError")
const { Op } = require('sequelize');
const sequelize = require("sequelize");
const photoController = require('../controllers/photoController')
const uuid = require("uuid");
const path = require("path");
class PlaceController {
    async getAll(req, res, next)
    {
        try {
            let {placeTypeId, limit, page} = req.query
            page = parseInt(page) || 1
            limit = parseInt(limit) || 20
            const offset = ((page-1)*limit)
            let allPlaces
            if (placeTypeId)
                allPlaces = await Place.findAll({
                    where: {placeTypeId},
                    limit,
                    offset,
                    subQuery: false,
                    include: [
                        { model: Photo, as: 'photo' },
                        {
                            model: Feedback,
                            as: 'feedbacks',
                            attributes: [
                                [sequelize.fn('AVG', sequelize.col('rate')), 'rate'],
                            ],
                            required: false, // Use 'required: false' for LEFT JOIN
                        },
                    ],
                    group: ['Place.id'], // Group by Place.id to get distinct places
                });
            else
                allPlaces = await Place.findAll({
                    where: {},
                    limit,
                    offset,
                    subQuery: false,
                    include: [
                        { model: Photo, as: 'photo' },
                        {
                            model: Feedback,
                            as: 'feedbacks',
                            attributes: [
                                [sequelize.fn('AVG', sequelize.col('rate')), 'rate'],
                            ],
                            required: false, // Use 'required: false' for LEFT JOIN
                        },
                    ],
                    group: ['Place.id'], // Group by Place.id to get distinct places
                });
            return res.json(allPlaces)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getById(req, res, next) {
        try {
            let { id } = req.params;

            // Получение средней оценки
            let rate = await Feedback.findOne({
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('rate')), 'averageRating'],
                ],
                where: {
                    placeId: id,
                },
            });
            rate = rate ? rate.dataValues.averageRating : null;

            // Получение места с фидбеками и фотографиями, а также пользователями
            const place = await Place.findOne({
                where: { id },
                include: [
                    {
                        model: Feedback,
                        as: 'feedbacks',
                        include: [
                            {
                                model: User,
                                attributes: ['name'], // Добавьте другие нужные атрибуты пользователя
                            },
                        ],
                    },
                    { model: Photo, as: 'photo' },
                ],
            });

            // Преобразование данных для ответа
            const serializedPlace = place.toJSON();
            serializedPlace.rate = rate;

            serializedPlace.feedbacks = serializedPlace.feedbacks.map(feedback => {
                let oldFeedback = feedback
                if (feedback.is_anonymous)
                    oldFeedback.userName = "Аноним"
                else
                    oldFeedback.userName = oldFeedback.user.name
                delete oldFeedback.is_anonymous
                delete oldFeedback.user
                return oldFeedback
            })

            return res.json(serializedPlace);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async create(req, res, next)
    {
        try {
            const {name, description, phone_number, website, address, longitude, latitude, placeTypeId} = req.body
            const newPlace = await Place.create({name, description, phone_number, website, address, longitude, latitude, placeTypeId} );
            const placeId = newPlace.id
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg"
            await photo.mv(path.resolve(__dirname, '..', 'static', fileName))
            const newPhoto = await Photo.create({"photo": fileName, placeId})
            return res.json(newPlace)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new PlaceController()
