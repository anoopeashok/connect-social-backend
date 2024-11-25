const Friend = require("../models/friend_model");
const Profile = require("../models/profile_model");
const { createJWT,friendSecret } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const { isTokenValid } = require("../utils");
const CustomError = require("../errors");

const getProfileSecret = async (req, res) => {
  const { user } = req;
  const token = createJWT(user);
  res.status(StatusCodes.OK).json({ msg: "success", profileSecret: token });
};

const sendFriendRequest = async (req, res) => {
  const { user } = req;
  const { token, friendID } = req.body;
  const payload = token == null ? friendID : isTokenValid(token).id;
  const profile = await Profile.findById(user.id).populate("friends");
  const friend = await Profile.findById(payload);

  if (friend.blockedProfiles.includes(profile._id)) {
    throw new CustomError.Forbidden("Cannot send request");
  }
  if (profile.sendFriendRequest.includes(friend._id)) {
    throw new CustomError.BadRequest("Request already pending");
  } else {
    const isFriend = profile.friends.find((val) => {
      return val.friend1 == friend._id || val.friend2 == friend._id;
    });
    if (isFriend) {
      throw new CustomError.BadRequest("${friend.name} is already a friend");
    }
  }

  profile.sendFriendRequests.push(friend._id);
  friend.receivedFriendRequests.push(profile._id);

  await profile.save();
  await friend.save();

  res.status(StatusCodes.OK).json({ msg: "Friend request sent" });
};

const acceptFriendRequest = async (req, res) => {
  const { user } = req;
  const { senderID } = req.body;
  const profile = await Profile.findOne({ user: user.id });
  const sender = await Profile.findById(senderID);

  if (!sender) {
    throw new CustomError.BadRequest("User not found");
  }
  const secret = await friendSecret(user.profile,senderID)
  const friend = await Friend.create({
    friend1: profile._id,
    friend2: sender._id,
    score: [],
    secret
  });
  profile.friends.push(friend);
  sender.friends.push(friend);

  await profile.save();
  await sender.save();

  res.status(StatusCodes.OK).json({ msg: "Request accepted" });
}

const removeFriend = async (req, res) => {
  const { user,body } = req
  const profile = await Profile.findById(user.profile)
  const secret = await friendSecret(body.friendID, user.profile)
  const friend = await Friend.findOneAndDelete({ secret })
  if (!friend) {
    throw new CustomError.BadRequest('Something went wrong')
  }
  let friends = profile.friends
  friends = friends.filter((id) => { return id !== body.friendID })
  profile.friends = friends

  await profile.save()
  res.status(StatusCodes.OK).json({msg:'success'})
}

const getMyFriends = async (req, res) => {
  const { user } = req;
  const profile = await Profile.findOne({ user: user.id }).populate({
    path: "friends",
    select: "friend1 friend2",
    populate: { path: "friend1", select: "picture name" },
  })
  if (!profile) {
    throw new CustomError.BadRequest("User not found");
  }
  res.status(StatusCodes.OK).json({ msg: "success", friends: profile.friends });
};

module.exports = {
  getProfileSecret,
  sendFriendRequest,
  acceptFriendRequest,
  getMyFriends,
  removeFriend
};
