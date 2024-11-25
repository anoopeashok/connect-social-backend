const otpCodeGen = require("./otp-gen");
const sendOTP = require("./send-otp");
const { createJWT, isTokenValid } = require("./jwt");
const createTokenUser = require("./tokenuser");
const { randomHexString } = require("./refresh_token");
const findAge = require("./findage");
const findMutualContacts = require("./find-mutual-contacts");
const friendSecret = require('./friend_secret')

module.exports = {
  otpCodeGen,
  sendOTP,
  createJWT,
  friendSecret,
  createTokenUser,
  isTokenValid,
  randomHexString,
  findAge,
  findMutualContacts,
};
