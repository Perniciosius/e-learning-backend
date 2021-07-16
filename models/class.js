// Data Model of Classes

const mongoose = require('mongoose')

const ClassSchema = mongoose.Schema({
    className: {
        type: String,
        required: false
    },
    courseIds: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }]
})

module.exports = mongoose.model('Class', ClassSchema)