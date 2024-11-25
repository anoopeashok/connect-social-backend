require('dotenv').config()
const axios = require('axios')
const res = require('express/lib/response')
const apiUrl = "https://www.fast2sms.com/dev/bulkV2"

const header = {
    "Authorization": process.env.OTP_API_KEY
}

const body =  {
    "variables_values": "5599",
    "route": "otp",
    "numbers": "9072084911",
  }

const sendOTP = async (otp,phone)=>{
    try{
        body.variables_values = otp
        body.numbers = phone
        const response = await axios.post(apiUrl,body,{headers: header})
    }catch(e){
        console.log(e)
    }

}

module.exports = sendOTP
