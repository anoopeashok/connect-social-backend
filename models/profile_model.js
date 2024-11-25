const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  picture: {
    type: mongoose.Types.ObjectId,
    ref: "Media",
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 3,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone"],
    unique: true,
  },
  dob: {
    type: Date,
    required: [true, "Please provide date of birth"],
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
    },
  },
  status: {
    type: String,
    enum: ["active", "suspended"],
    default: "active",
  },
  contacts: [{ type: String, unique: true }],
  mutualContacts: [
    { type: mongoose.Types.ObjectId, ref: "Profile", unique: true },
  ],
  friends: [{ type: mongoose.Types.ObjectId, ref: "Friend", required: true }],
  receivedFriendRequests: [
    {
      type: mongoose.Types.ObjectId,
      ref: "FriendRequest",
    },
  ],
  sendFriendRequests: [
    {
      type: mongoose.Types.ObjectId,
      ref: "FriendRequest",
    },
  ],
  blockedProfiles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  ],
  profileSettings: {
    type: mongoose.Types.ObjectId,
    ref: "ProfileSettings",
  },
  invitations: [{ type: mongoose.Types.ObjectId, ref: "Invitation" }],
});

module.exports = mongoose.model("Profile", ProfileSchema);
