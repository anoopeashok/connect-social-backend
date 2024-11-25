const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  let token;
  const header = req.headers.authorization;
  if (header && header.startsWith("Bearer ")) {
    token = header.split(" ")[1];
  }
  if (!token) {
    throw new CustomError.UnAuthenticated("Please provide a valid token");
  }
  try {
    const payload = isTokenValid(token);
    req.user = payload;
    next();
  } catch (e) {
    throw new CustomError.UnAuthenticated("Please provide a valid token");
  }
};

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.Forbidden(
        "You are not authorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRole };
