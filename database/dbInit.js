const dotenv = require('dotenv'),
    bcrypt = require('bcrypt'),
    Sequelize = require('sequelize')

const Models = require('../models')

dotenv.config()

const series_types = [
    { title: 'АВ', description: 'Банковская карта' },
    { title: 'АП', description: 'Пушкинская карта' },
]
const status_types = [
    { title: 'В продаже', description: 'Билет доступен для покупки' },
    { title: 'Куплен', description: 'Билет куплен (кем и на что см. таб. "Билеты")' },
    { title: 'Использован', description: 'Билет проверен контролёром' },
    { title: 'Возврат', description: 'Владелец оформил возврат билета' },
]
const rating_types = [
    { title: 0, description: 'Мероприятие для лиц, не достигших возраста шести лет' },
    { title: 6, description: 'Мероприятие для лиц, достигших возраста шести лет' },
    { title: 12, description: 'Мероприятие для лиц, достигших возраста двенадцати лет' },
    { title: 16, description: 'Мероприятие для лиц, достигших возраста шестнадцати лет' },
    { title: 18, description: 'Мероприятие для лиц, достигших возраста восемнадцати лет' },
]

// Создание базы данных
const createDB = async () => {
    await console.log('\n\t-Creating database... ')
    const db_name = process.env.SQLserver_database
    await new Sequelize({
        host: process.env.SQLserver_host,
        port: process.env.SQLserver_port,
        username: process.env.SQLserver_username,
        password: process.env.SQLserver_password,
        timezone: '+08:00',
        dialect: process.env.SQLserver_dialect,
    }).query(`CREATE DATABASE IF NOT EXISTS ${db_name};`)
//  Раскоментировать строку ниже и удалить строку выше для MSSQL 
//  }).query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${db_name}') BEGIN CREATE DATABASE [${db_name}] END`)
}
// Создание таблиц
const insertTables = async () => {
    await console.log('\n\t-Creating tables... ')
    await Models.EventRating.sync({})
    await Models.TicketsSeries.sync({})
    await Models.TicketsStatus.sync({})
    await Models.Events.sync({})
    await Models.Poster.sync({})
    await Models.Tickets.sync({})
    await Models.Users.sync({})
}
// Создание связей
const createRelations = async () => {
    await console.log('\n\t-Creating relations between tables...')
    await Models.Poster.hasMany(Models.Tickets, {
        sourceKey: 'poster_id',
        foreignKey: 'ticket_event',
        onUpdate: 'cascade',
        onDelete: 'NO ACTION'
    })
    await Models.TicketsSeries.hasMany(Models.Tickets, {
        sourceKey: 'series_id',
        foreignKey: 'ticket_series',
        onUpdate: 'cascade',
        onDelete: 'NO ACTION'
    })
    await Models.TicketsStatus.hasMany(Models.Tickets, {
        sourceKey: 'status_id',
        foreignKey: 'ticket_status',
        onUpdate: 'cascade',
        onDelete: 'NO ACTION'
    })
    await Models.EventRating.hasMany(Models.Events, {
        sourceKey: 'rating_id',
        foreignKey: 'event_rating',
        onUpdate: 'cascade',
        onDelete: 'NO ACTION'
    })
    await Models.Events.hasMany(Models.Poster, {
        sourceKey: 'event_id',
        foreignKey: 'poster_event',
        onUpdate: 'cascade',
        onDelete: 'NO ACTION'
    })
}
// Создание базовых записей
const insertData = async () => {
    await console.log('\n\t-Creating base records...')
    await bcrypt.hash(process.env.adminPanel_password, 12, async (err, hash) => {
        if (err) console.log(err.message)
        new Models.Users({
            user_name: process.env.adminPanel_username,
            user_password: hash
        }).save()
    })
    await series_types.forEach((type) => {
        new Models.TicketsSeries({
            series_title: `${type.title}`,
            series_description: `${type.description}`
        }).save()
    })
    await status_types.forEach((type) => {
        new Models.TicketsStatus({
            status_title: `${type.title}`,
            starus_description: `${type.description}`
        }).save()
    })
    await rating_types.forEach((type) => {
        new Models.EventRating({
            rating_title: `${type.title}`,
            rating_description: `${type.description}`
        }).save()
    })
}

createDB()
    .then(() => createRelations())
    .then(() => insertTables())
    .then(() => insertData())
    .finally(() => console.log("Success"))
