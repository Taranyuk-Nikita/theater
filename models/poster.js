const { DataTypes, Model, UUIDV4 } = require('sequelize')

const sequelize = require('../database/dbConnect')

class Poster extends Model {
    otherPublicField;
}

Poster.init(
    {
        poster_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        poster_event: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        poster_datetime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        poster_price: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        poster_amount_tickets: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        poster_tickets_sold: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        }
    },
    {
        modelName: 'Poster',
        timestamps: false,
        freezeTableName: true,
        tableName: 'Poster',
        sequelize
    }
)

module.exports = Poster;