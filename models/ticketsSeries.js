const { DataTypes, Model, UUIDV4 } = require('sequelize')

const sequelize = require('../database/dbConnect')

class TicketsSeries extends Model {
    otherPublicField;
}

TicketsSeries.init(
    {
        series_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        series_title: {
            type: DataTypes.STRING(2),
            allowNull: false,
            unique: true,
        },
        series_description: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        }
    },
    {
        modelName: 'ticketsSeries',
        timestamps: false,
        freezeTableName: true,
        tableName: 'TicketsSeries',
        sequelize
    }
)

module.exports = TicketsSeries;