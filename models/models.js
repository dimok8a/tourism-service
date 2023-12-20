const sequelize = require("../Database")
const {DataTypes} = require("sequelize")
const perf_hooks = require("perf_hooks");

const User = sequelize.define('user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(32), allowNull: false},
        mail: {type: DataTypes.STRING(32), allowNull: false, unique: true},
        hash: {type: DataTypes.STRING(64), allowNull: false},
        is_admin: {type: DataTypes.BOOLEAN, defaultValue: false},
        token: {type: DataTypes.STRING(32), defaultValue: null},
    })

const PlaceType = sequelize.define('place_type',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(32), allowNull: false}
    })

const Photo = sequelize.define('photo',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        photo: {type: DataTypes.STRING, allowNull: false}
    })


const Place = sequelize.define('place',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING(32), allowNull: false},
        description: {type: DataTypes.STRING(300)},
        phone_number: {type: DataTypes.STRING(12)},
        website: {type: DataTypes.STRING(100)},
        address: {type: DataTypes.STRING(100), allowNull: false},
        longitude: {type: DataTypes.DECIMAL(10, 4), allowNull: false},
        latitude: {type: DataTypes.DECIMAL(10, 4), allowNull: false}
    })

const Feedback = sequelize.define('feedback',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        is_anonymous: {type: DataTypes.BOOLEAN, allowNull: false},
        body: {type: DataTypes.STRING(300), allowNull: false},
        rate: {type: DataTypes.INTEGER},
    })

PlaceType.hasMany(Place)
Place.belongsTo(PlaceType)


User.hasMany(Feedback)
Feedback.belongsTo(User)

Place.hasMany(Feedback)
Feedback.belongsTo(Place)

Place.hasMany(Photo, {as: "photo"})
Photo.belongsTo(Place)

module.exports = {
    User, PlaceType, Place, Photo, Feedback
}
