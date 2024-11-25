const mongoose = require('mongoose')
const PinnedPostSchema = mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref:'Post',
        required: true
    },
    event: {
        type: mongoose.Types.ObjectId,
        ref:'Event',
        required:true
    }
})

module.exports = mongoose.model('PinnedPost',PinnedPostSchema)