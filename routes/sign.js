const express = require('express'),
    bcrypt = require('bcrypt'),
    { jwtSign } = require('../controllers/authentication'),
    Models = require('../models'),
    router = express.Router()


router.get('/signin', function (req, res, next) {
    res.render('signin');
});

router.post("/in", async (req, res) => {
    const сandidate = await Models.Users.findOne({
        where: {user_name: req.body.username}
    })
    console.log(сandidate);
    let pass = сandidate !== null;
    if (pass) {
        pass = await bcrypt.compare(req.body.password, сandidate.getDataValue('user_password'));
    }
    if (pass) {
        res.cookie("access", jwtSign(req.body.username));
        res.status(200);
        res.send("OK");
    } else {
        res.status(200);
        res.send("Неверный логин или пароль");
    }
});

router.post("/out", (req, res) => {
    res.clearCookie("access");
    res.status(200);
    res.send("OK");
});

module.exports = router;
