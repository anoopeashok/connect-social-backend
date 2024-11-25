const { StatusCodes } = require("http-status-codes");
const Story = require("../models/story_model");
const CustomError = require('../errors')

const createStory = async (req, res) => {
  const { body, user, files } = req;
  let media = [];
  for (let i = 0; i < files.length; i++) {
    const result = await new RemoteFileHandler().fileUpload(files[i]);
    const mediaType = global.imageTypes.includes(result.split(".").pop())
      ? "IMAGE"
      : "VIDEO";
    media.push({ name: result, type: mediaType });
  }
  body.media = media;
  body.profile = user.profile;
  const story = await Story.create(body);
  res.status(StatusCodes).json({ msg: "success", story });
}

const deleteStory = async (req, res) => {
    const { user, params } = req
    const story = await Story.findOneAndDelete({ profile: user.profile, _id: params.id })
    if (!story) {
        throw new CustomError.BadRequest('Story not found')
    }
    res.status(StatusCodes.OK).json({msg:'success'})
}

module.exports = { createStory, deleteStory };
