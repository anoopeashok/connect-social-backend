const mongoose = require("mongoose");

const PlaceSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 4,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  media: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Media",
      required: true,
    },
  ],
  schedule: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Schedule",
      required: true,
    },
  ],
  score: [Number],
  placeType: {
    type: mongoose.Types.ObjectId,
    ref: "PlaceType",
    required: true,
  },
  privacy: {
    type: String,
    enum: ["friends", "public"],
    default: "friends",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Profile',
    required:true
  }
});

module.exports = mongoose.model("Place", PlaceSchema);
