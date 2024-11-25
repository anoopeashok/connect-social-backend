
const mongoose = require('mongoose')

const visibility = ['friends','public']

const ProfileSettingsSchema = mongoose.Schema({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  accountVisibility: {
    type: String,
    enum: visibility,
    default: "public",
  },
  postVisibility: {
    type: String,
    enum: visibility,
    default: "public",
  }
});

module.exports = mongoose.model('ProfileSettings',ProfileSettingsSchema)
