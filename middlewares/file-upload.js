const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv')

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set your AWS Access Key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set your AWS Secret Key
  region: 'us-west-2', // Region of your S3 bucket
})

const s3 = new AWS.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname, type: split('.').pop()})
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}-${file.originalname}`)
    },
  }),
})

module.exports = { upload }