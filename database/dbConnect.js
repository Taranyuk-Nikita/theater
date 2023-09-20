const   Sequelize = require('sequelize'),
        dotenv = require('dotenv')

dotenv.config()

const connectToDB = new Sequelize({
    host: process.env.SQLserver_host,
    port: process.env.SQLserver_port,
    username: process.env.SQLserver_username,
    password: process.env.SQLserver_password,
    database: process.env.SQLserver_database,
    timezone: '+08:00',
    dialect: process.env.SQLserver_dialect,
    dialectOptions: {
        options: {
            encrypt: process.env.SQLserver_dialectOptions_encrypt === 'true',
            instanceName: process.env.SQLserver_dialectOptions_instanceName
        }
    }
})

module.exports = connectToDB