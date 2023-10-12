const { DataTypes, Model, UUIDV4 } = require('sequelize')

const sequelize = require('../database/dbConnect')

class Event extends Model {
    otherPublicField;
}

Event.init(
    {
        event_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        event_title: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: true,
        },
        event_subtitle: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: false,
        },
        event_duration: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            unique: false,
        },
        event_rating: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: false,
        },
        event_pushka: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
        },
        event_authors: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false,
        },
        event_description_tiny: {
            type: DataTypes.STRING(256),
            allowNull: false,
            unique: false,
        },
        event_description: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: false,
        }
    },
    {
        modelName: 'Event',
        timestamps: false,
        freezeTableName: true,
        tableName: 'Events',
        indexes: [
            {
                name: 'event_rating',
                fields: ['event_rating'],
            },
        ],
        sequelize
    }
)

module.exports = Event;