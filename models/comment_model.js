const mongoose = require('mongoose')

const CommmentSchema = mongoose.Schema({
    comment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength:100
    },
    reply: [{
        type: mongoose.Types.ObjectId,
        ref:'Comment'
    }],
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required:true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    score:[Number]
})

module.exports = mongoose.model('Comment',CommmentSchema)