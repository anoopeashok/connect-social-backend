const findAge = (date) => {
  const currentDate = new Date();
  const bday = new Date(date);
  const age = Math.floor(
    (currentDate - bday) / (1000 * 60 * 60 * 24 * 365)
  );
  return age > 14;
};

module.exports = findAge;
