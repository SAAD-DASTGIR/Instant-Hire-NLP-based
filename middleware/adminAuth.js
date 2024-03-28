const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next){
    //get token from header
    const token = req.header('x-auth-token')

    //check if there is no token
    if(!token){
        return res.status(401).json({msg: 'No token found, authorization failed'})
    }

    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.admin = decoded.admin
        next()

    }catch(err){
        return res.status(401).json({ msg: 'Invalid token'})
    }

    //verify token
}