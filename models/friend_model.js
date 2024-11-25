const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema({
  friend1: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  friend2: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  secret: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
  score: [Number],
});

module.exports = mongoose.model("Friend", FriendSchema);
