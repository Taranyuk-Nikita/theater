const express = require('express'),
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

router.post('/addEvent', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) return res.redirect("/signin");
  let raiting = await Models.EventRating.findOne({
    where: { rating_id: "ded329d3-7427-4878-89fd-b3eb930c849a" }
  });
  console.log(raiting.getDataValue('rating_id'));
  await new Models.Events({
    event_title: req.body.event_title,
    event_subtitle: req.body.event_subtitle,
    event_duration: parseInt(req.body.event_duration),
    event_rating: raiting.getDataValue('rating_id'),
    event_pushka: req.body.event_pushka,
    event_authors: req.body.event_authors,
    event_description_tiny: req.body.event_description_tiny,
    event_description: req.body.event_description
  }).save()
  res.status(200);
  res.send("OK");
});

module.exports = router;
