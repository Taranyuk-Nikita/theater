const express = require('express'),
  { jwtVerify } = require('../controllers/authentication'),
  Models = require('../models'),
  router = express.Router();

/* GET repertoire page. */
router.get('/adminpanel', function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) {
    res.redirect("/signin");
  } else {
    res.render("adminpanel", { user: user["user"] });
  }
});

router.get('/table/:tablename', async function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) {
    res.redirect("/signin");
  } else {
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
      default:
        break;
    }
  }
});


module.exports = router;
