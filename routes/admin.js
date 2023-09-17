const express = require('express'),
  { jwtVerify } = require('../controllers/authentication'),
  router = express.Router();

/* GET repertoire page. */
router.get('/adminpanel', function (req, res, next) {
  let user = jwtVerify(req.cookies);
  if (user === false) {
    res.redirect("/signin");
  } else {
    res.render("adminpanel", { user : user["user"] });
  }
});

module.exports = router;
