const mongoose = require("mongoose");
const Media = require("./media_model");
const StorySchema = mongoose.Schema(
  {
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
    },
    media: Media,
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
    tagged: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
      },
    ],
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", StorySchema);
