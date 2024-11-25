const mongoose = require("mongoose");
const GroupSchema = mongoose.Schema({
  profiles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  description: String,
  admins: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  ],
});
module.exports = mongoose.model("ChatGroup", GroupSchema);
