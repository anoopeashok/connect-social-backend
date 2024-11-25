
const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: String,
    phone: String,
    contacts:[String]//list of phone numbers
})