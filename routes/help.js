const   express = require('express'),
        router = express.Router();

/* GET home page. */
router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Express' });
});

module.exports = router;
