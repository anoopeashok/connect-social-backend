const mongoose = require('mongoose')
const InvitationSchema = mongoose.Schema({
    profile: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required:true
    },
    requestAccepted: {
        type: String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    },
    sentBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required:true
    },
    sentByFriend: {
        type: Boolean,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model("Invitation", InvitationSchema);