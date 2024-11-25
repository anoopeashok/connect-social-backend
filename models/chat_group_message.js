const mongoose = require('mongoose')
const GroupMessageSchema = mongoose.Schema({
    message: {
        type: String,  
    },
    media: [{
        type: mongoose.Types.ObjectId,
        ref:'Media'
    }],
    post: {
        type: mongoose.Types.ObjectId,
        ref:'Post'
    },
    senter: {
        type: String,
        ref: 'Profile',
        required:true
    },
    group: {
        type: mongoose.Types.ObjectId,
        ref:'ChatGroup'
    }

}, {timestamps:true})

module.exports = mongoose.model('GroupMessage',GroupMessageSchema)