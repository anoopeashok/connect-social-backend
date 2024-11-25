const { StatusCodes } = require("http-status-codes");
const Place = require("../models/place_model");
const CustomError = require("../errors");

//TO-DO check place if it is already occupied. or out side of allowed boundary

const createPlace = async (req, res) => {
  const { user, body, files } = req;

  if (files.length == 0) {
    throw new CustomError.BadRequest("Please select any media");
  }
  let media = [];

  for (let i = 0; i < files.length; i++) {
    const result = await new RemoteFileHandler().fileUpload(files[i]);
    const mediaType = global.imageTypes.includes(result.split(".").pop())
      ? "IMAGE"
      : "VIDEO";
    media.push({ name: result, type: mediaType });
  }
  body.media = media;
  body.createdBy = user.profile;
  const place = await Place.create(body);
  res.status(StatusCodes.OK).json({ msg: "success", place });
};

const getPlace = async (req, res) => {
  const { params, user } = req;
  const place = await Place.findById(params.id);
  if (!place) {
    throw new CustomError.NotFound("Place not found");
  }
  if (place.privacy == "friends") {
  }
  res.status(StatusCodes.OK).json({ msg: "success", place });
};

const updatePlace = async (req, res) => {
  const { user, files, body } = req;
  const { id, media } = req.body;

  const place = await Place.findById(id);
  if (!place) {
    throw new CustomError.BadRequest("Event not found");
  }
  if (place.createdBy != user.profile) {
    throw new CustomError.Forbidden("Permission denied");
  }
  if (media.length + files.length > 10) {
    throw new CustomError.BadRequest("Max 10 files allowed");
  }
  for (let i = 0; i < files.length; i++) {
    const result = await new RemoteFileHandler().fileUpload(files[i]);
    const mediaType = global.imageTypes.includes(result.split(".").pop())
      ? "IMAGE"
      : "VIDEO";
    media.push({ name: result, type: mediaType });
  }
  body.media = media;
  delete body.createdBy;
  Object.assign(place, body);
  await place.save();
  res.status(StatusCodes.OK).json({ msg: "Success", place });
};

const deletePlace = async (req, res) => {
  const { params, user } = req;
  const place = await Place.findById(params.id);
  if (!place) {
    throw new CustomError.NotFound("Event not found");
  }
  if (place.createdBy != user.profile) {
    throw new CustomError.Forbidden("Failed");
  }

  res.status(StatusCodes.OK).json({ msg: "success" });
};

const suggestedPlaces = async (req, res) => {};

module.exports = {
  createPlace,
  getPlace,
  updatePlace,
  deletePlace,
  suggestedPlaces,
};
