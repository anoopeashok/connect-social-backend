
const mongoose = require('mongoose')

const Community = mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:200
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        minlength: 50
    },
    members: {
        
    }
})