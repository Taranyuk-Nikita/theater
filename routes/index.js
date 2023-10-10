const express = require('express'),
  { Op } = require("sequelize"),
  router = express.Router();

const Models = require('../models')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const title = "Афиша"
  let event;
  const addEventInfo = async (poster) => {
    for (let i = 0; i < poster.length; i++) {
      event = await Models.Events.findOne({
        where: { event_id: poster[i].poster_event },
        attributes: ['event_id', 'event_title', 'event_subtitle', 'event_rating', 'event_description_tiny']
      })
      poster[i].event_id = event.event_id
      poster[i].event_title = event.event_title
      poster[i].event_subtitle = event.event_subtitle
      poster[i].event_rating = await Models.EventRating.findOne({
        where: { rating_id: event.event_rating },
        attributes: ['rating_title']
      })
      poster[i].event_rating = poster[i].event_rating.dataValues.rating_title
      poster[i].event_description_tiny = event.event_description_tiny
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
