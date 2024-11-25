const bcrypt = require("bcryptjs");

const friendSecret = async (id1, id2) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash([id1, id2].sort(), salt);
}

module.exports = friendSecret
