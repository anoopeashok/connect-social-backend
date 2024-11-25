const mongoose = require('mongoose')

const ReactionSchema = mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref:'Post',
        required:true
    },
    profile: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required:true
    }
})

module.exports = mongoose.model('Reaction',ReactionSchema)