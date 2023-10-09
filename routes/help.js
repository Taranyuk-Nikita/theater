const   express = require('express'),
        router = express.Router();

/* GET home page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Помощь' });
});

module.exports = router;
