
const mongoose = require('mongoose')
const NotificationSchema = mongoose.Schema({
    message: {
        type: String,
        required:true
    },
    path: String,
    profile: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification',NotificationSchema)