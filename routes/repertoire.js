const   express = require('express'),
        router = express.Router();

/* GET repertoire page. */
router.get('/repertoire', function(req, res, next) {
  res.render('repertoire', { title: 'Express' });
});

module.exports = router;
