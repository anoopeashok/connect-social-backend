const mongoose = require('mongoose')
const MessageSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    media: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Media",
      },
    ],
    post: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    senter: {
      type: String,
      ref: "Profile",
      required: true,
    },
    recepient: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Message',MessageSchema)