const Follower = require("../models/follower_model");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const follow = async (req, res) => {
  const { user, params } = req;
  const isFollower = await Follower.findOne({
    profile: user.profile,
    follower: params.id,
  });
  if (isFollower) {
    throw new CustomError.BadRequest("Already a follower");
  }
  const follower = await Follower.create({
    profile: user.profile,
    follower: params.id,
  });
  res.status(StatusCodes.OK).json({ msg: "success", follower });
};

const unfollow = async (req, res) => {
  const { user, params } = req;
  
  const isFollower = await Follower.findOneAndDelete({
    profile: user.profile,
    follower: params.id,
  })
  if (!isFollower) {
    throw new CustomError.NotFound("not found");
  }
  res.status(StatusCodes.OK).json({ msg: "success" });
}

const myFollowers = async (req, res) => {
      const { sort } = req.query;
      const { user } = req.body;
      const queryObject = { profile: user.profile };
      const query = Follower.find(queryObject);
    //   if (sort == "oldest") {
    //     query = query.sort("date");
    //   } else {
    //     query = query.sort("-date");
    //   }
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      const followers = await query;
      const totalFollowers = await Follower.countDocuments(queryObject);
      const numPage = Math.ceil(totalFollowers / limit);

      res.status(StatusCodes.OK).json({ msg: "success", followers, numPage });
}

module.exports = { follow, unfollow,myFollowers };
