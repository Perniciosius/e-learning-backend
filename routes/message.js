const router = require('express').Router()
const Message = require('../models/message')
const Course = require('../models/course')

router.get('/', (req, res) => {
    const { id, teacher } = req.user
    if (!teacher) {
        Message.find({ studentId: id }, (err, messages) => {
            if (err) return res.json({
                error: err
            })
            return res.json(messages)
        })
    }
    Message.find({ teacherId: id }, (err, messages) => {
        if (err) return res.json({
            error: err
        })
        return res.json(messages)
    })
})

router.post('/', (req, res) => {
    const { id, teacher } = req.user
    if (teacher) return res.json({
        error: 'Permission denied.'
    })
    const { courseId, content } = req.body
    Course.findById(courseId, (err, course) => {
        if (err) return res.json({
            error: err
        })
        const newMessage = new Message({
            studentId: id,
            teacherId: course.teacherId,
            courseName: course.courseName,
            content: content
        })
        newMessage.save((err) => {
            if (err) return res.json({
                error: err
            })
            return res.json({
                message: 'Message sent'
            })
        })
    })
})

router.get('/:messageId', (req, res) => {
    const { messageId } = req.params
    Message.findById(messageId, (err, message) => {
        if (err) return res.json({
            error: err
        })
        return res.json(message)
    })
})

router.delete('/:messageId', (req, res) => {
    const { id, teacher } = req.user
    const { messageId } = req.params
    Message.findById(messageId, (err, message) => {
        if (err) return res.json({
            error: err
        })
        if ((teacher && id == message.teacherId) || (!teacher && id == message.studentId)) {
            message.delete((err) => {
                if (err) return res.json({
                    error: err
                })
                return res.json({
                    message: 'Message deleted'
                })
            })
        }
    })
})

module.exports = router