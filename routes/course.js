// Routes related to Courses

const router = require('express').Router()
const Course = require('../models/course')
const Class = require('../models/class')

router.get('/', (req, res) => {
    const { id, classId, teacher } = req.user
    if(!classId && !teacher) return res.json({
        error: 'User do not belong to any class'
    })

    if(!teacher) {
        Class.findById(classId, (err, doc) => {
            if(err) return res.json({
                error: err
            })
            if(!doc) return res.json({
                error: "Class not found"
            })
            Course.find({_id: {$in: doc.courseIds}}, (err, courses) => {
                if(err) return res.json({
                    error: err
                })
                return res.json(courses)
            })
        })
    }
    Course.find({teacherId: id}, (err, courses) => {
        if(err) return res.json({
            error: err
        })
        return res.json(courses)
    })
    
})

router.get('/:courseId', (req, res) => {
    const { courseId } = req.params
    Course.findById(courseId, (err, course) => {
        if(err) return res.json({
            error: err
        })
        return res.json(course)
    })
})

module.exports = router