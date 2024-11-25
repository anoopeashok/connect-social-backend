require('dotenv')
const aws = require('aws-sdk')
const fs = require('fs')

class RemoteFileHandler{

    constructor(){
        if(!RemoteFileHandler.instance){
            console.log(' Remote File Handler call')
            this.s3 = new aws.S3({
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET,
                

            })
            RemoteFileHandler.instance = this
            
        }
        return RemoteFileHandler.instance
    }

    async fileUpload(file){
        const fileContent = fs.readFileSync(file.path)
        const params = {
          Bucket: process.env.S3_BUCKET,
          Key: Date.now().toString() + "." + file.originalname.split(".")[1],
          Body: fileContent,
          ACL: "public-read",
        };
        const result = await this.s3.upload(params).promise()
        fs.unlinkSync('./'+file.path)
        return result
    }

    async fileDelete(fileLocation){
        const key = fileLocation.split('/').pop().split('.')[0]
        const params = {
            Bucket: process.env.S3_BUCKET,
            Key: key
        }
        const result = await this.s3.deleteObject(params)
        return result
    }

}

module.exports = RemoteFileHandler