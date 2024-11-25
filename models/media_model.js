const mongoose = require('mongoose')

const mediaType = ['IMAGE','VIDEO']
const MediaSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    type: {
        type: String,
        enum: mediaType,
        required:true
    }
})
module.exports = mongoose.model('Media',MediaSchema)
