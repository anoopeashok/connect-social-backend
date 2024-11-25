const mongoose = require("mongoose");
const FollowerSchema = mongoose.Schema({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  follower: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  score: [Number],
}, {timestamps:true});

module.exports = mongoose.model("Follower", FollowerSchema);
