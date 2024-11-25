const mongoose = require("mongoose")

const ReportSchema = mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
  place: {
    type: mongoose.Types.ObjectId,
    ref: "Place",
  },
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "Profile",
  },
  event: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
  },
  message: {
    type: String,
    required: true,
  },
  reportType: {
    type: String,
      enum: ["POST", "PROFILE", "PLACE", "EVENT"],
    required:true
  },
})

module.exports = mongoose.model("Report", ReportSchema)
