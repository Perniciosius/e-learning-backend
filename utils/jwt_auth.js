// Verify access token

const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt_config')

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.json({
        error: 'Authorization header not available'
    })

    if(authHeader.toLowerCase().split(' ')[0] !== 'bearer') return res.json({
        error: 'Invalid Authorization header'
    })

    const token = authHeader.split(' ')[1]
    
    jwt.verify(token, jwtConfig.secret, (err, user) => {
        if(err) return res.json({
            error: err
        })

        req.user = user
        next()
    })
}

module.exports = authJWT