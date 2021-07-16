// Routes related to Class

const router = require('express').Router()
const Class = require('../models/class')


router.get('/', (req, res) => {
    const { classId } = req.user
    if(!classId) return res.json({
        error: 'User do not belong to any class'
    })

    Class.findById(classId, (err, doc) => {
        if(err) return res.json({
            error: err
        })
        return res.json(doc)
    })
})

module.exports = router