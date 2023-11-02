const   jwt = require('jsonwebtoken'),
        dotenv = require('dotenv')

const   jwtKey = process.env.jwt_key || "3a7218b69971a194900156d626de22ff7c473ad552359ac4d2ecf02c479ff941bf5f95464cab01300080de73227dfdc1aee7011887e318695f70d44fc1b5b4145ea324d250b183277d61f1923fac69f828f5e083eb3795c40c443f60b6a0b8c8cc115ff67209c85ea1060d716904fc7c693ebe4f18d87e7ac57b82f7bafff278",
        jwtIss = process.env.jwt_iss || "irkpo",
        jwtAud = process.env.jwt_aud || "site.com",
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

