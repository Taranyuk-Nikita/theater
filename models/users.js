const { DataTypes, Model } = require('sequelize')

const sequelize = require('../database/dbConnect')

class User extends Model {
    otherPublicField;
}

User.init(
    {
        user_name: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        user_password: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
    },
    {
        modelName: 'User',
        timestamps: false,
        freezeTableName: true,
        tableName: 'Users',
        sequelize
    }
)

module.exports = User;