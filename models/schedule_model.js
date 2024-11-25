const mongoose = require("mongoose");

const ScheduleSchema = mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"],
    required: true,
  },
  count: {
    type: Number,
  },
  interval: Number,
  byDay: [String],
  byMonth: [Number],
  ByMonthDay: [Number],
  endDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
