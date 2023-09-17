const   express = require('express'),
        router = express.Router();

/* GET EVENT page. */
router.get('/event', function(req, res, next) {
  res.render('event', { title: 'Express' });
});

module.exports = router;
