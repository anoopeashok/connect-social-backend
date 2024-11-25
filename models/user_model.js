const mongoose = require("mongoose");
const validator = require('validator')
const bcrypt = require("bcryptjs");


const UserSchema = mongoose.Schema(
  {
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
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value, "en-IN");
        },
        message: "Please provide a valid phone",
      },
    },
    dob: {
      type: Date,
      required: [true, "Please provide date of birth"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      length: 6,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    otpExpiryDate: Date,
  },
  { timestamps: true }
);

// UserSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   const salt = await bcrypt.genSalt(10);
//   this.password =  bcrypt.hash(this.password, salt);
// });

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};



module.exports = mongoose.model("User", UserSchema);
