const express = require('express'),
  { Op } = require("sequelize"),
  router = express.Router();

const Models = require('../models')

/* GET EVENT page. */
router.get('/buyticket', async function (req, res, next) {

  await Models.Events.findAll({
    order: [
      ['event_title', 'ASC'],
    ],
    attributes: ['event_title', 'event_id', 'event_pushka']
  })
    .then((result) => res.render('buyticket', { title: 'Оформление заказа', result }))
    .catch((error) => console.log(` ERROR! \n ${console.error(error)}`))

});

router.get('/buyticket/getposter/:eventId', async function (req, res, next) {

  const eventid = req.params.eventId

  await Models.Poster.findAll({
    order: [["poster_datetime", "ASC"]],
    where: {
      poster_event: req.params.eventId,
      poster_datetime: {
        [Op.gt]: new Date(),
      }
    },
    attributes: ['poster_id', 'poster_datetime', 'poster_price', 'poster_amount_tickets', 'poster_tickets_sold']
  })
    .then((poster) => res.json(poster))
    .catch((error) => console.log(` ERROR! \n ${console.error(error)}`))

});

module.exports = router;
