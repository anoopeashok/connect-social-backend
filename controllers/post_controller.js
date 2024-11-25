const Post = require("../models/post_model");
const Friend = require('../models/friend_model')
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { friendSecret } = require("../utils");

const createPost = async (req, res) => {
  const { user, files } = req;

  const { description, event, place, commentsDisabled,privacy, tagged } = req.body;

  if (files.length == 0) {
    throw new CustomError.BadRequest("Please select any media");
  }

  if (!event && !place) {
    throw new CustomError.BadRequest('Please tag a location or place')
  }

  let media = [];

  for (let i = 0; i < files.length; i++) {
    const result = await new RemoteFileHandler().fileUpload(files[i]);
    const mediaType = global.imageTypes.includes(result.split(".").pop())
      ? "IMAGE"
      : "VIDEO";
    media.push({ name: result, type: mediaType })
  }
  const profile = user.profile;

  const post = await Post.create({
    description,
    event,
    place,
    commentsDisabled,
    tagged,
      media,
    privacy,
    profile,
  });
  res.status(StatusCodes.OK).json({ msg: "Success", post });
};

const updatePost = async (req, res) => {
  const { user } = req;
  const { id, description, event, place, commentsDisabled,privacy, tagged } = req.body;
  const post = await Post.find({ id, profile: user.profile });
  if (!post) {
    throw new CustomError.NotFound("Post not found");
  }
  Object.assign(post, { description, event, place, commentsDisabled,privacy, tagged });
  await post.save();
  res.status(StatusCodes.OK).json({ msg: "success", post });
}

const getPost = async (req, res) => {
    const {user,params} = req
    const post = await Post.findById(params.id)
    if (!post) {
        throw new CustomError.NotFound('Post not found')
    }
    if (post.privacy == 'friends') {
      const secret = await friendSecret(user.profile, post.profile)
      const friend = await Friend.findOne({ secret })
      if (!friend) {
        throw new CustomError.NotFound('Post not found')
      }
    }
    res.status(StatusCodes.OK).json({msg:'success',post})
}

const deletePost = async (req, res) => {
  const { user, params } = req
  const post = await Post.findOneAndDelete({ _id: params.id, profile: user.profile })
  if (!post) {
    throw new CustomError.NotFound('Post not found')
  }
  res.status(StatusCodes.OK).json({msg:'success'})
}

const suggestedPosts = async (req, res) => {};

module.exports = {
  createPost,
  updatePost,
  getPost,
  deletePost,
  suggestedPosts,
};
