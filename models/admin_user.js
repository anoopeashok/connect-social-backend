const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const AdminUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email id",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    role: {
      type: String,
      enum: ["super-admin","admin", "content-handler"],
    },
  },
  { timestamps: true }
);

AdminUserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AdminUserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("AdminUser", AdminUserSchema);
