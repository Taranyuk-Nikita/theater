const { DataTypes, Model, UUIDV4 } = require('sequelize')

const sequelize = require('../database/dbConnect')

class EventRating extends Model {
    otherPublicField;
}

EventRating.init(
    {
        rating_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        rating_title: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            unique: true,
        },
        rating_description: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        }
    },
    {
        modelName: 'eventRating',
        timestamps: false,
        freezeTableName: true,
        tableName: 'EventRating',
        sequelize
    }
)

module.exports = EventRating;