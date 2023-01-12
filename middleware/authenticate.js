const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
exports.authTokenAdmin = (req, res, next) => {
    const {authorization} = req.headers
    const token = authorization && authorization.split(' ')
    if(!token || token[0] !== 'Bearer') {return res.sendStatus(401)}
    const { role } = jwt.verify(token[1], process.env.TOKEN_SECRET)
    if(role === 'user' || role === 'kepala') return res.sendStatus(403)
    next()
}
exports.authTokenKepala = (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')
    if (!token || token[0] !== 'Bearer') { return res.sendStatus(401) }
    const { role } = jwt.verify(token[1], process.env.TOKEN_SECRET)
    if (role === 'user' || role === 'admin') return res.sendStatus(403)
    next()
}
exports.authTokenUser = (req, res, next) => {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')
    if (!token || token[0] !== 'Bearer') { return res.sendStatus(401) } 
    const { role } = jwt.verify(token[1], process.env.TOKEN_SECRET)
    if (role === 'admin' || role === 'kepala') return res.sendStatus(403)
    next()
}
