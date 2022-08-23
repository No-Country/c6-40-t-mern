const sharp = require('sharp')
const { PutObjectCommand } = require('@aws-sdk/client-s3')

const { BUCKET_NAME } = process.env

module.exports.imgUploadConfig = async (reqFile) => {
  const { buffer, originalname, mimetype } = reqFile

  const resizedBuffer = await sharp(buffer).resize({
    width: 1920,
    height: 1080
  }).toBuffer()

  const imgName = `${Date.now()}-${originalname}`

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: imgName,
    Body: resizedBuffer,
    ContentType: mimetype
  })

  return {
    command,
    img: {
      name: imgName,
      mimetype
    }
  }
}
