// Подключение к БД
const connectToDB = require("./dbConnect.js")
connectToDB
    // Подключиться 
    .authenticate()
    .then(() => console.log('Connection to db was successful.'))
    .catch((err) => console.error('Connection error: ', err))
    // Отключиться
    .then(() => connectToDB
                    .close()
                    .then(() => console.log('Connection to db was closed.'))
                    .catch((err) => console.error('Close connection error: ', err))
        )