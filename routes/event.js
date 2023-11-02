const express = require('express'),
  router = express.Router();

const Models = require('../models')

/* GET EVENT page. */
router.get('/event/:id', async function (req, res, next) {

  let title
  const getEvent = async (event) => {
    title = event.event_title
    event.event_rating = await Models.EventRating.findOne({
      where: { rating_id: event.event_rating },
      attributes: ['rating_title', 'rating_description']
    })
    Math.floor(event.event_duration / 60) > 0 ?
      event.event_duration = `${Math.floor(event.event_duration / 60)} ч. ${event.event_duration % 60} мин.` :
      event.event_duration = `${event.event_duration % 60} мин.`
    event.rating_description = event.event_rating.dataValues.rating_description
    event.event_rating = event.event_rating.dataValues.rating_title
    event.event_authors = event.event_authors.split('\n')
    event.event_description = event.event_description.split('\n')

    return event;
  }

  await Models.Events.findOne({
    where: { event_id: req.params.id }
  })
    .then((result) => getEvent(result))
    .then((event) => res.render('event', { title, event }))
    .catch((error) => console.log(` ERROR! \n ${console.error(error)}`))
});

module.exports = router;
