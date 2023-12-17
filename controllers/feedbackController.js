const {Feedback} = require("../models/models")
class FeedbackController {
    async getByPlaceId(req, res)
    {
        const {placeId} = req.body
        const foundFeedbacks = await Feedback.findAll({where: {placeId}})
        return res.json(foundFeedbacks)
    }

    async create(req, res)
    {
        const {is_anonymous, body, rate, userId, placeId} = req.body
        const newFeedback = await Feedback.create({is_anonymous, body, rate, userId, placeId})
        return res.json(newFeedback)
    }

}

module.exports = new FeedbackController()
