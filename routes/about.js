const   express = require('express'),
        router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

module.exports = router;
