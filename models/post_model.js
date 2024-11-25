const mongoose = require("mongoose");
const Media = require("../models/media_model");

const PostSchema = mongoose.Schema({
  description: {
    type: String,
    maxlength: 1000,
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
  },
  media: {
    type: [Media],
    required: [true, "Please select any media"],
  },
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  place: {
    type: mongoose.Types.ObjectId,
    ref: "Place",
  },
  score: [Number],
  commentsDisabled: {
    type: Boolean,
    default: false,
  },
  reactionCount: {
    type: Number,
    default: 0,
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  privacy: {
    type: String,
    enum: ["friends", "public"],
    default: "friends",
  },
  tagged: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
    },
  ],
}, {timestamps:true});

module.exports = mongoose.model("Post", PostSchema);
