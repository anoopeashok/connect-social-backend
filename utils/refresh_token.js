const crypto = require("crypto");

const randomHexString = () => {
    const refreshToken = crypto.randomBytes(40).toString("hex");
    return refreshToken
};

module.exports = {randomHexString}
