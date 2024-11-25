const max = 999999
const min = 111111

const otpCodeGen = ()=>{ 
  const otp =   Math.floor(Math.random() * (max-min +1))+min

  const twoMinutesForward = Date.now() + (2 * 1000 * 60)

  const dateTwoMinutesForward = new Date(twoMinutesForward);
  return {otp: otp, date : dateTwoMinutesForward}
}

module.exports = otpCodeGen