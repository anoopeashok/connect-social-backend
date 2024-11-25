const CustomError = require("../errors");

const imageFilter = (req, file, cb) => {
  const extension = file.split(".").pop();

  if (global.imageTypes.includes(extension)) {
    cb(null, true);
  } else {
    cb(new CustomError.BadRequest("Only images are allowed"), false);
  }
};

const videoFilter = (req, file, cb) => {
  const extension = file.split(".").pop();

  if (global.videoTypes.includes(extension)) {
    cb(null, true);
  } else {
    cb(new CustomError.BadRequest("videos are allowed"), false);
  }
};

const fileFilter = (req, file, cb) => {
  const extension = file.split(".").pop();

  if (global.fileTypes.includes(extension)) {
    cb(null, true);
  } else {
    cb(new CustomError.BadRequest("Images or videos are allowed"), false);
  }
};


module.exports = { imageFilter, videoFilter, fileFilter };
