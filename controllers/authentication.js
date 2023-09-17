const   jwt = require('jsonwebtoken'),
        dotenv = require('dotenv')

const   jwtKey = "YOUR-SECRET-KEY",
        jwtIss = "YOUR-NAME",
        jwtAud = "site.com",
        jwtAlgo = "HS512";        

dotenv.config()

module.exports.jwtSign = (user) => {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&_-", rnd = "";
    for (let i=0; i<16; i++) {
        rnd += char.charAt(Math.floor(Math.random() * char.length));
    }

    let now = Math.floor(Date.now() / 1000);

    return jwt.sign({
        iat : now, // issued at - time when token is generated
        nbf : now, // not before - when this token is considered valid
        exp : now + 3600, // expiry - 1 hr (3600 secs) from now in this example
        jti : rnd, // random token id
        iss : jwtIss, // issuer
        aud : jwtAud, // audience
        data : { user : user } // whatever else you want to put
    }, jwtKey, { algorithm: jwtAlgo });
};

module.exports.jwtVerify = (cookies) => {
    if (cookies.access===undefined) { return false; }
    try {
      let decoded = jwt.verify(cookies.access, jwtKey);
      return decoded["data"];
    } catch (err) { return false; }
};

