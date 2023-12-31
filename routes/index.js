const express = require('express'),
  { Op } = require("sequelize"),
  router = express.Router();

const Models = require('../models')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const title = "Афиша"
  let event;
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }
  const addEventInfo = async (poster) => {
    for (let i = 0; i < poster.length; i++) {
      event = await Models.Events.findOne({
        where: { event_id: poster[i].poster_event },
        attributes: ['event_id', 'event_title', 'event_subtitle', 'event_rating', 'event_pushka', 'event_description_tiny']
      })
      poster[i].poster_tickets_left = poster[i].poster_amount_tickets - poster[i].poster_tickets_sold
      poster[i].event_id = event.event_id
      poster[i].event_title = event.event_title
      poster[i].event_subtitle = event.event_subtitle
      poster[i].event_rating = await Models.EventRating.findOne({
        where: { rating_id: event.event_rating },
        attributes: ['rating_title', 'rating_description']
      })
      poster[i].rating_description = poster[i].event_rating.dataValues.rating_description
      poster[i].event_rating = poster[i].event_rating.dataValues.rating_title
      poster[i].event_pushka = event.event_pushka
      poster[i].event_description_tiny = event.event_description_tiny
      poster[i].event_cover_num = getRandomIntInclusive(0, 9)
    }
    return poster
  }

  await Models.Poster.findAll({
    order: [["poster_datetime", "ASC"]],
    where: {
      poster_datetime: {
        [Op.gt]: new Date(),
      }
    },
    limit: 12
  })
    .then((result) => addEventInfo(result))
    .then((poster) => res.render('index', { title, poster }))
    .catch((error) => console.log(` ERROR! \n ${console.error(error)}`))
});

module.exports = router;
