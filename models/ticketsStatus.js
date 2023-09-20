const { DataTypes, Model, UUIDV4 } = require('sequelize')

const sequelize = require('../database/dbConnect')

class TicketsStatus extends Model {
    otherPublicField;
}

TicketsStatus.init(
    {
        status_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        status_title: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        starus_description: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
        }
    },
    {
        modelName: 'ticketsStatus',
        timestamps: false,
        freezeTableName: true,
        tableName: 'TicketsStatus',
        sequelize
    }
)

module.exports = TicketsStatus;