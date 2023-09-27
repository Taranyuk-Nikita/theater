const   express = require('express'),
        router = express.Router();

const Models = require('../models')

/* GET repertoire page. */
router.get('/repertoire', async function(req, res, next) {
  const title = "Репертуар"
  await Models.Events.findAll({
    attributes: ['event_id', 'event_title', 'event_description_tiny'],
    order: [["event_title", "ASC"]]
  })
    .then((events) => res.render('repertoire', { title, events }))
    .catch((error) => console.log(` ERROR! \n ${console.error(error)}`))
});

module.exports = router;
