// Routes related to Lesson

const router = require('express').Router()
const Lesson = require('../models/lesson')
const Course = require('../models/course')
const user = require('../models/user')

router.get('/', (req, res) => {
    const { courseId } = req.query
    if (!courseId || courseId === '') return res.json({
        error: 'Invalid course id'
    })

    Lesson.find({ courseId: courseId }, (err, lessons) => {
        if (err) return res.json({
            error: err
        })
        return res.json(lessons)
    })
})

router.get('/:lessonId', (req, res) => {
    const { lessonId } = req.params
    Lesson.findById(lessonId, (err, lesson) => {
        if (err) return res.json({
            error: err
        })
        return res.json(lesson)
    })
})

router.post('/create', (req, res) => {
    const { id, teacher } = req.user
    if (!teacher) return res.json({
        error: 'Only teachers can change lessons.'
    })
    const { lessonName, content, image, video } = req.body
    if (!content) return res.json({
        error: 'Lesson content must not be empty.'
    })
    Course.findOne({ teacherId: id }, (err, course) => {
        if (err) return res.json({
            error: err
        })
        const newLesson = new Lesson({
            lessonName: lessonName,
            courseId: course._id,
            content: content,
            image: image,
            video: video
        })
        newLesson.save((err) => {
            if (err) return res.json({
                error: err
            })
        })
    })
})

router.delete('/:lessonId', (req, res) => {
    const { id, teacher } = req.user
    if (!teacher) return res.json({
        error: 'Permission denied'
    })
    const { lessonId } = req.params
    Lesson.findById(lessonId, (err, lesson) => {
        if (err) return res.json({
            error: err
        })
        Course.findById(lesson.courseId, (err, course) => {
            if (err) return res.json({
                error: err
            })
            if (course.teacherId !== id) return res.json({
                error: 'Permission denied'
            })
            lesson.delete((err) => {
                if (err) return res.json({
                    error: err
                })
                return res.json({
                    message: 'Lesson deleted.'
                })
            })
        })
    })
})

router.put('/:lessonId', (req, res) => {
    const { id, teacher } = req.user
    if (!teacher) return res.json({
        error: 'Permission denied'
    })
    const { lessonId } = req.params

    Lesson.findById(lessonId, (err, lesson) => {
        if (err) return res.json({
            error: err
        })
        Course.findById(lesson.courseId, (err, course) => {
            if (err) return res.json({
                error: err
            })
            if (course.teacherId !== id) return res.json({
                error: 'Permission denied'
            })
            const { lessonName, content, image, video } = req.body
            if (!content) return res.json({
                error: 'Lesson content must not be empty.'
            })
            lesson.lessonName = lessonName
            lesson.content = content
            lesson.image = image
            lesson.video = video
            lesson.save((err) => {
                if(err) return res.json({
                    error: err
                })
                return res.json({
                    message: 'Lesson updated'
                })
            })
        })
    })
})


module.exports = router
