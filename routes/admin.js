const express = require('express'),
  multer = require("multer"),
  fs = require('fs/promises'),
  path = require('path'),
  { jwtVerify } = require('../controllers/authentication'),
  Models = require('../models'),
  router = express.Router();

router.get('/adminpanel', function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  res.render("adminpanel", { user: user["user"] });
});

router.get('/table/:tablename', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  switch (req.params.tablename) {
    case "Poster":
      let event;
      const addEventInfo = async (poster) => {
        for (let i = 0; i < poster.length; i++) {
          event = await Models.Events.findOne({
            where: { event_id: poster[i].poster_event },
            attributes: ['event_id', 'event_title']
          })
          poster[i].dataValues.event_id = event.event_id
          poster[i].dataValues.event_title = event.event_title
        }
        return poster
      }

      await Models.Poster.findAll({
        order: [["poster_datetime", "DESC"]]
      })
        .then((result) => addEventInfo(result))
        .then((poster) => {
          res.json(poster)
          // res.json(eventsList())
        })
        .catch((error) => console.log(` ERROR! \n ${console.error(error)}`))
      break;
    /* ----- */
    case "Repertoire":
      const addEventsInfo = async (event) => {
        for (let i = 0; i < event.length; i++) {
          raiting = await Models.EventRating.findOne({
            where: { rating_id: event[i].event_rating },
          })
          event[i].dataValues.event_rating = raiting.rating_title
          event[i].dataValues.event_rating_desc = raiting.rating_description
        }
        return event
      }

      await Models.Events.findAll({
        order: [["event_title", "ASC"]]
      })
        .then((result) => addEventsInfo(result))
        .then((events) => {
          res.json(events)
        })
        .catch((error) => console.log(` ERROR! \n ${console.error(error)}`))
      break;
    /* ----- */
    default:
      break;
  }
});


/* Репертуар */
router.get('/getEvent/:eventId', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  let event = await Models.Events.findOne({
    where: { event_id: req.params.eventId }
  });
  res.status(200);
  res.json(event);
});

router.post('/addEvent', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  const eventData = JSON.parse(req.body.data)
  const raiting = await Models.EventRating.findOne({
    where: { rating_title: eventData.event_rating.slice(0, -1) }
  });
  const newEvent = await new Models.Events({
    event_title: eventData.event_title,
    event_subtitle: eventData.event_subtitle,
    event_duration: parseInt(eventData.event_duration),
    event_rating: raiting.getDataValue('rating_id'),
    event_pushka: eventData.event_pushka,
    event_authors: eventData.event_authors,
    event_description_tiny: eventData.event_description_tiny,
    event_description: eventData.event_description
  }).save()

  const newEventId = newEvent.getDataValue('event_id')

  fs.mkdir(`public/storage/${newEventId}`, {
    recursive: true
  }).then(() => {
    req.files.cover.mv(`public/storage/${newEventId}/cover_${newEventId}.jpg`)
    // req.files.cover.mv(`public/storage/${newEventId}/cover_${newEventId}${path.extname(req.files.cover.name)}`)
    for (let index = 0; index < req.files.gallery.length; index++) {
      req.files.gallery[index].mv((`public/storage/${newEventId}/gallery-${index}_${newEventId}.jpg`))
    }
  })

  res.status(200);
  res.send("Мероприятие успешно добавлено в репертуар.");
});

router.put('/updateEvent/:eventId', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  const eventData = JSON.parse(req.body.data)
  let raiting = await Models.EventRating.findOne({
    where: { rating_title: eventData.event_rating.slice(0, -1) }
  });
  await Models.Events.update({
    event_title: eventData.event_title,
    event_subtitle: eventData.event_subtitle,
    event_duration: parseInt(eventData.event_duration),
    event_rating: raiting.getDataValue('rating_id'),
    event_pushka: eventData.event_pushka,
    event_authors: eventData.event_authors,
    event_description_tiny: eventData.event_description_tiny,
    event_description: eventData.event_description
  }, {
    where: {
      event_id: req.params.eventId
    }
  })
  fs.mkdir(`public/storage/${req.params.eventId}`, {
    recursive: true
  }).then(() => {
    req.files.cover.mv(`public/storage/${req.params.eventId}/cover_${req.params.eventId}.jpg`)
    // req.files.cover.mv(`public/storage/${req.params.eventId}/cover_${req.params.eventId}${path.extname(req.files.cover.name)}`)
    for (let index = 0; index < req.files.gallery.length; index++) {
      req.files.gallery[index].mv((`public/storage/${req.params.eventId}/gallery-${index}_${req.params.eventId}.jpg`))
    }
  })
  res.status(200);
  res.send("Мероприятие успешно обновлено.");
});

router.delete('/deleteEvent/:eventId', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  if (await Models.Poster.findOne({ where: { poster_event: req.params.eventId } })) return res.status(406).send("Мероприятие невозможно удалить, так как оно размещено на афише!")
  await Models.Events.destroy({
    where: { event_id: req.params.eventId }
  })
  fs.rmdir(`public/storage/${req.params.eventId}`, {
    recursive: true
  })
  res.status(200);
  res.send("Мероприятие успешно удалено из репертуара.");
});

/* Афиша */
router.get('/getEventsForPoster', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  const eventsList = await Models.Events.findAll({
    attributes: ['event_id', 'event_title']
  })

  res.status(200);
  res.json(eventsList);
});

router.get('/getPoster/:posterId', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  let poster = await Models.Poster.findOne({
    where: { poster_id: req.params.posterId }
  });
  res.status(200);
  res.json(poster);
});

router.post('/addPoster', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");

  await new Models.Poster({
    poster_event: req.body.poster_event,
    poster_datetime: req.body.poster_datetime,
    poster_price: req.body.poster_price,
    poster_amount_tickets: req.body.poster_amount_tickets,
    poster_link_on_kassy_ru: req.body.poster_link_on_kassy_ru,
    poster_tickets_sold: 0,
  }).save()

  res.status(200);
  res.send("Мероприятие успешно добавлено на афишу.");
})

router.put('/updatePoster/:posterId', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  await Models.Poster.update({
    poster_event: req.body.poster_event,
    poster_datetime: req.body.poster_datetime,
    poster_price: req.body.poster_price,
    poster_amount_tickets: req.body.poster_amount_tickets,
    poster_link_on_kassy_ru: req.body.poster_link_on_kassy_ru,
  }, {
    where: {
      poster_id: req.params.posterId
    }
  })
  res.status(200);
  res.send("Афиша успешно обновлена.");
});

router.delete('/deletePoster/:posterId', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
    await Models.Poster.destroy({
    where: { poster_id: req.params.posterId }
  })
  res.status(200);
  res.send("Мероприятие успешно удалено из афиши.");
});

module.exports = router;