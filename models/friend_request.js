const mongoose = require("mongoose")

const FriendRequestSchema = mongoose.Schema({
       sender: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'Profile'
        
    } 
})

module.exports = mongoose.model("FriendRequest",FriendRequestSchema)