const { StatusCodes } = require("http-status-codes");
const Friend = require("../models/friend_model")
const Event = require("../models/event_model");
const CustomError = require("../errors");

const createEvent = async (req, res) => {
  const { user, files, body } = req;

  if (files.length == 0) {
    throw new CustomError.BadRequest("Please select any media");
  }
  let media = files.map((file) => ({ name: file.location, type:file.type }))

  body.media = media;
  body.createdBy = user.profile;

  const event = await Event.create(body);
  res.status(StatusCodes.OK).json({ msg: "Success", event });
};

const getEvent = async (req, res) => {
  const { params, user } = req;
  const event = await Event.findById(params.id);
  if (!event) {
    throw new CustomError.NotFound("Event not found");
  }
  if (event.privacy == "friends") {
      const friendship = await Friend.findOne({
        $or: [
          { friend1: user.id, friend2: event.createdBy, status: 'accepted' },
          { friend1: event.createdBy, friend2: user.id, status: 'accepted' },
        ],
      })
    
    if (!friendship) {
      throw new CustomError.NotFound("Event not found")
    }
  }
  res.status(StatusCodes.OK).json({ msg: "success", event });
};

const updateEvent = async (req, res) => {
  const { user, files, body } = req;
  const { id, media } = req.body;

  const event = await Event.findById(id);
  if (!event) {
    throw new CustomError.BadRequest("Event not found");
  }
  if (event.createdBy != user.profile) {
    throw new CustomError.Forbidden("Permission denied");
  }
  if (media.length + files.length > 10) {
    throw new CustomError.BadRequest("Max 10 files allowed");
  }

  let newMedia = files.map((file) => ({ name: file.location, type: file.type }))

  body.media = media + newMedia;
  delete body.createdBy
  Object.assign(event, body);
  await event.save();
  res.status(StatusCodes.OK).json({ msg: "Success", event });
}

const deleteEvent = async (req, res) => {
  const { params, user } = req;
  const event = await Event.findById(params.id);
  if (!event) {
    throw new CustomError.NotFound("Event not found");
  }
  if (event.createdBy != user.profile) {
    throw new CustomError.Forbidden("Failed");
  }

  res.status(StatusCodes.OK).json({ msg: "success" });
}

const getSuggestedEvents = async (req, res) => {};

module.exports = {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getSuggestedEvents,
};
