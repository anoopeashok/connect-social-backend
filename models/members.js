
const mongoose = require('mongoose')
const MemberSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:true
    },
    
}) 