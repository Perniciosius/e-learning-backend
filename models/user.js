// User Model

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    classId: {
        type: String,
        required: false
    },
    teacher: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)