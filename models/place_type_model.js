const mongoose = require("mongoose");
const PlaceTypeSchema = mongoose.Schema({});

module.exports = mongoose.model("PlaceType", PlaceTypeSchema);
