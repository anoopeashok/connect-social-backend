const Reaction = require("../models/reaction_model");
const Post = require("../models/post_model");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const like = async (req, res) => {
  const { user, params } = req;
  const post = await Post.findById(params.id);
  if (!post) {
    throw new CustomError.NotFound("Post not found");
  }
  const reaction = await Reaction.create({
    post: params.id,
    profile: user.profile,
  });
  post.reactionCount = post.reactionCount + 1;
  await post.save();
  res.status(StatusCodes.OK).json({ msg: "success" });
};

const unlike = async (req, res) => {
  const { user, params } = req;
  const post = await Post.findById(params.id);
  if (!post) {
    throw new CustomError.NotFound("Post not found");
  }
  const reaction = await Reaction.findOneAndDelete({
    post: params.id,
    profile: user.profile,
  });
  if (!reaction) {
    throw new CustomError.NotFound("something wrong");
  }
  post.reactionCount = post.reactionCount - 1;
  await post.save();
  res.status(StatusCodes.OK).json({ msg: "success" });
};

module.exports = { like, unlike };
