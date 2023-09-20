const { DataTypes, Model, UUIDV4 } = require('sequelize')

const sequelize = require('../database/dbConnect')

class Ticket extends Model {
    otherPublicField;
}

Ticket.init(
    {
        ticket_id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        ticket_series: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        ticket_num: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
        },
        ticket_event: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        ticket_status: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        ticket_owner_FIO: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        ticket_owner_phone: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        ticket_owner_email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        modelName: 'Ticket',
        timestamps: true,
        freezeTableName: true,
        tableName: 'Tickets',
        indexes: [
            {
                name: 'ticket_series',
                fields: ['ticket_series'],
            },
            {
                name: 'ticket_event',
                fields: ['ticket_event'],
            },
            {
                name: 'ticket_status',
                fields: ['ticket_status'],
            }
        ],
        sequelize
    }
)

module.exports = Ticket;