// User related routes

const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt_config')
const authJWT = require('../utils/jwt_auth')


router.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !email || !password) return res.json({
        error: 'Data incomplete'
    })

    User.findOne({ email: email }, (err, user) => {
        if (err) return res.json({
            error: err.message
        })

        if (user) return res.json({
            error: 'User already exists'
        })

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })
        newUser.save((err, user) => {
            if (err) return res.json({
                error: err.message
            })
            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                teacher: user.teacher
            }
            const accessToken = jwt.sign(payload, jwtConfig.secret, { expiresIn: '7d' })
            return res.json({
                token: accessToken
            })
        })
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (err) return res.json({
            error: err.message
        })
        if (!user) return res.json({
            error: 'Invalid email or password'
        })

        if (!bcrypt.compareSync(password, user.password)) return res.json({
            error: 'Invalid email or password'
        })

        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            teacher: user.teacher
        }
        if (user.classId) {
            payload.classId = user.classId
        }

        const accessToken = jwt.sign(payload, jwtConfig.secret, { expiresIn: '7d' })
        return res.json({
            token: accessToken
        })
    })
})

router.get('/details', authJWT, (req, res) => {
    const { id } = req.user
    User.findById(id, { password: 0 }, (err, user) => {
        if (err) return res.json({
            error: err
        })
        return res.json(user)
    })
})

module.exports = router