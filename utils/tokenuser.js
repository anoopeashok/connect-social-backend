const createTokenUser = (user) => {
    return { name: user.name, id: user._id,phone: user.phone };
  };
  
  module.exports = createTokenUser;
  