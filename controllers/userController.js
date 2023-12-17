const ApiError = require("../error/ApiError")
const {User} = require("../models/models");
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const generateJwt = (id, mail, is_admin) => {
    return jwt.sign(
        {id, mail, is_admin},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController {
    async registration(req, res, next)
    {
        const {name, mail, hash} = req.body;
        if (!mail || !hash || !name)
            return next(ApiError.badRequest('Некорректные данные'))
        const candidate = await User.findOne({where: {mail}})
        if (candidate)
            return next(ApiError.badRequest('Пользователь с таким e-mail уже существует'))
        const newUser = await User.create({name, mail, hash} );
        const token = generateJwt(newUser.id, mail, newUser.is_admin)
        return res.json({token})
    }

    async login(req, res, next)
    {
        const {mail, hash, randomNumber} = req.body
        const user = await User.findOne({where: {mail}})
        if (!user)
            return next(ApiError.badRequest("Пользователь с таким mail не найден"))
        if (md5(user.hash+randomNumber) === hash)
        {
            const token = generateJwt(user.id, mail, user.is_admin)
            return res.json({token})
        } else
        {
            return next(ApiError.badRequest("Пароль неверный"))
        }
    }

    async check(req, res, next)
    {
        const token = generateJwt(req.user.id, req.user.mail, req.user.is_admin)
        return res.json({token})
    }
}

module.exports = new UserController()
