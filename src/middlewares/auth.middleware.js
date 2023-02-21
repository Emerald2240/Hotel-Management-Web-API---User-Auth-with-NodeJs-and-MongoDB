const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    req.user = 'User'
    next()
}

//Use json web token node module to validate access tokens and get encrypted user data
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const user = req.user;
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token);
    if (token == null) {
        return res.status(401).send({ message: "Missing access token. Pass it in the headers: Auth section. In this format: 'Bearer sdfweuwe324wrw324sxs...'" });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send({ message: "Please login first", err });
            req.user = user

            next();
        });
    }
}

module.exports = authenticateToken