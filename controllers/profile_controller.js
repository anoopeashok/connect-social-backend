const Profile = require("../models/profile_model");
const User = require("../models/user_model");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { findAge, findMutualContacts } = require("../utils");

const profile = async (req, res) => {
  const { user } = req;
  const profile = await Profile.findOne({ user: user.id });
  if (!profile) {
    throw new CustomError.NotFound("User not found");
  }
  res.status(StatusCodes.OK).json({ msg: "success", profile });
};

const getProfileById = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const profile = await Profile.findById(id);
  if (!profile) {
    throw new CustomError.NotFound("user not found");
  }
  if (profile.blockedProfiles.includes(user.id)) {
    throw new CustomError.Forbidden("User blocked you");
  }
  res.status(StatusCodes.OK).json({ msg: "success", profile });
};

const updateProfile = async (req, res) => {
  const { name, dob, phone, description } = req.body;
  const { user } = req;
  const profile = await Profile.findOne({ user: user.id });
  const userFull = await User.findById(user.id);
  if (name) {
    profile.name = name;
    userFull.name = name;
  }
  if (dob) {
    const age = findAge(dob);
    if (age < 14) {
      throw new CustomError.BadRequest("User cannot be younger than 14");
    }
    profile.dob = dob;
    userFull.dob = dob;
  }
  if (description) {
    profile.description = description;
  }
  if (phone) {
    profile.phone = phone;
    user.phone = phone;
    user.isPhoneVerified = false;
  }
  await profile.save();
  await user.save();
  res.status(StatusCodes.OK).json({ msg: "Profile updated successfully" });
};

const deleteProfile = async (req, res) => {
  const { user } = req;
  const userFull = await User.findById(user.id);
  if (!userFull) {
    throw new CustomError.NotFound("User not found");
  }
  const profile = await Profile.findOne({ user: user.id });
  await profile.drop();
  await user.drop();

  res.status(StatusCodes.OK).json({ msg: "User deleted" });
};

const syncContacts = async (req, res) => {
  const { user } = req;
  const { contacts } = req.body;
  const profile = await Profile.findOne({ user: user.id });

  const newContactsArray = [...Set(profile.contacts + contacts)];
  profile.contacts = newContactsArray;
  await profile.save();

  const mutualContacts = await findMutualContacts(user).filter(
    (item) => item._id
  );
  profile.mutualContacts = mutualContacts;
  await profile.save();

  res.status(StatusCodes.OK).json({ msg: "Successfully synced" });
};

const getAllMutalContacts = async (req, res) => {
  const { user } = req;
  const profiles = await Profile.findOne({ user: user.id }).populate({
    path: "mutualContacts",
    select: "_id name phone",
  });
  res.status(StatusCodes.OK).json({ msg: "success", profiles });
};

module.exports = {
  updateProfile,
  profile,
  getProfileById,
  deleteProfile,
  syncContacts,
  getAllMutalContacts,
};
