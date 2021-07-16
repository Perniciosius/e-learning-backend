// Data Model of Lessons

const mongoose = require('mongoose')

const LessonSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    lessonName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Lesson', LessonSchema)