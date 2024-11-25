const User = require("../models/user_model");
const Profile = require("../models/profile_model");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Token = require("../models/token_model");
const bcrypt = require("bcryptjs");

const {
  createJWT,
  createTokenUser,
  otpCodeGen,
  sendOTP,
  randomHexString,
  findAge,
} = require("../utils");

const register = async (req, res) => {
  const { name, phone, dob, password } = req.body;

  if (!name || !phone || !dob || !password) {
    throw new CustomError.BadRequest("Please provide all the fields");
  }

  const age = findAge(dob)
  if (age < 14) {
    throw new CustomError.BadRequest(
      "You are not old enough to register an account"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    phone,
    dob,
    password: hashedPassword,
  });
  const profile = await Profile.create({ name, phone, dob, user: user._id });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Registration successfull", id: user._id });
};

const triggerOTP = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new CustomError.BadRequest("Please provide all fields")
  }

  const user = await User.findById(id);
  if (!user) {
    throw new CustomError.NotFound("User not found")
  }
  if (user.isPhoneVerified) {
    throw new CustomError.Forbidden("User already verified")
  }

  const { otp, date } = otpCodeGen();
  user.otp = otp;
  user.otpExpiryDate = date;

  await user.save();
  await sendOTP(otp, "9072084911");

  res.status(StatusCodes.OK).json({ msg: "OTP sent to registered phone" });
};

const verifyPhone = async (req, res) => {
  const { id, otp } = req.body;
  if (!id || !otp) {
    throw new CustomError.BadRequest("Please provide all the fields");
  }

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError.NotFound("User not found");
  }
  if (user.isPhoneVerified) {
    throw new CustomError.BadRequest("phone already verified");
  }

  const currentTime = new Date();
  const otpExpiryDate = new Date(user.otpExpiryDate);

  if (otp == user.otp && currentTime.getTime() < otpExpiryDate.getTime()) {
    user.otpExpiryDate = null;
    user.otp = null;
    user.isPhoneVerified = true;
    await user.save();

    const refreshToken = randomHexString();
    const token = await Token.create({ refreshToken, user: user._id });

    return res.status(StatusCodes.OK).json({ msg: "Phone number verified" });
  } else if (otp !== user.otp) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid OTP" });
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "OTP timed out" });
  }
};

const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new CustomError.BadRequest("Please provide phone and password");
  }

  const user = await User.findOne({ phone });
  if (!user) {
    throw new CustomError.UnAuthenticated("Please provide valid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticated("Please provide valid credentials");
  }
  const refreshToken = await Token.findOne({ user: user._id });
  if (refreshToken) {
    if (!refreshToken.isValid) {
      throw new CustomError.UnAuthenticated(
        "This account is restricted.Please contact support"
      );
    }
    const hexString = randomHexString();
    refreshToken.refreshToken = hexString;
    await refreshToken.save();
  }
  const profile = await Profile.findOne({user:user.id})
  const tokenUser = createTokenUser(user);
  tokenUser.profile = profile._id
  const accessToken = createJWT({ payload: tokenUser });

  res.status(StatusCodes.OK).json({
    msg: "Successfully logged in",
    accessToken,
    refreshToken: refreshToken.refreshToken,
  });
};

const updateAccessToken = async (req, res) => {
  const { refreshToken, id } = req.body;
  if (!refreshToken || !id) {
    throw new CustomError.BadRequest("Invalid request");
  }
  const token = await Token.findOne({ refreshToken, _id: id });
  if (!token) {
    throw new CustomError.UnAuthenticated("Invalid Token");
  }
  const user = await User.findById(token.user);
  const tokenUser = createTokenUser(user);
  const accessToken = createJWT({ payload: tokenUser });

  res.status(StatusCodes.OK).json({ accessToken, id: user._id });
};

module.exports = {
  register,
  triggerOTP,
  verifyPhone,
  login,
  updateAccessToken,
};
