
const mongoose = require('mongoose')

const RankAttributes = mongoose.Schema({
    createdAt: Date,
    updatedAt: Date,
    likes: Number,
    comments: Number,
    share: Number,
    ctr: Number,
    sentiment:Number,
    
})

module.exports = mongoose.model('RankAttributes',RankAttributes)