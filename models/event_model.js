const mongoose = require("mongoose");
const Media = require('./media_model')
const Schedule = require('./schedule_model')


const Booking = mongoose.Schema({
  url: String,
  name: String,
});

const EventNotice = mongoose.Schema({
  date: Date,
  title: String,
  description: {
    type: String,
    required: true
  }
})

function arrayLimit10(val) {
  return val.length <= 10;
}
function arrayLimit3(val) {
  return val.length <= 3;
}

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
    minlength: 10,
    maxlength: 500,
  },
  media: {
    type: [Media],
    validate: [arrayLimit10, "{PATH} exceeds limit of 10"],
  },
  eventType: {
    type: mongoose.Types.ObjectId,
    ref: "EventType",
    required: [true, "Please provide a event type"],
  },
  score: {
    type: [Number],
  },
  ageRating: {
    type: String,
    enum: [],
    required: [true, "Please provide a rating"],
  },
  repeat: {
    type: Boolean,
    default:false
  },
  eventSchedule: [Schedule],
  eventStatus: {
    type: String,
    enum: ["Reshedule", "Active", "Cancelled"],
    required: [true, "Please provide a status"],
  },
  privacy: {
    type: String,
    enum: ["friends", "public"],
    default: "friends",
  },
  language: String,
  keywords: {
    type: [String],
    validate: [arrayLimit3, "{PATH} exceeds the limit of 3"],
  },
  eventNotice: EventNotice,
  place: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Place",
      required: true,
    },
  ],
  isAccessibleForFree: {
    type: Boolean,
    default: true,
  },
  termsAndConditions: String,
  booking: [Booking],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Profile',
    required:true
  }
});

module.exports = mongoose.model("Event", EventSchema);

//divide map into equal size squares and nearby blocks are saved. and content is tagged by block.
//content is suggested by block by block
