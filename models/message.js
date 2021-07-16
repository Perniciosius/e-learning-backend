const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Message', MessageSchema)