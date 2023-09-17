const   dotenv = require('dotenv'),
        bcrypt = require('bcrypt'),
        Sequelize = require('sequelize')

const Models = require('../models')

dotenv.config()

const createDB = async () => {
    // Создание базы данных
    console.log('\n Creating database... ')
    try {
        const connectToDB = require("./dbConnect.js")
        const db_name = process.env.SQLserver_database
        await new Sequelize({
            host: process.env.SQLserver_host,
            port: process.env.SQLserver_port,
            username: process.env.SQLserver_username,
            password: process.env.SQLserver_password,
            timezone: '+08:00',
            dialect: 'mysql'
        }).query(`CREATE DATABASE IF NOT EXISTS ${db_name};`)
            .then(() => {
                // Создание таблиц
                console.log(' Creating tables... ')
                try {
                    Models.Users.sync({})
                    .then(() => console.log(' Done! \n'))
                    // Создание базовых записей
                    .then(() => {
                        console.log(' Creating base records... ')
                        try {
                            const insertData = async () => {
                                bcrypt.hash(process.env.adminPanel_password, 12, async (err, hash) => {
                                    if (err) console.log(err.message)
                                    new Models.Users({
                                        user_name: process.env.adminPanel_username,
                                        user_password: hash
                                    }).save()
                                })
                            }
                            insertData()
                                .then(() => console.log(' Done! \n'))
                        } catch (error) {
                            console.log(chalk.bgRed.white.bold(' Error of Creating base records! \n'))
                            console.error(error)
                        }
                    })
                } catch (error) {
                    console.log(' Error of creating tables! \n')
                    console.error(error)
                }
            })
        console.log(' Done! \n')
    } catch (error) {
        console.log(' Error of creating database! \n')
        console.error(error)
    }
}

createDB()