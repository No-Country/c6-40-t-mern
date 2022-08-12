const { S3Client } = require("@aws-sdk/client-s3");
import dotenv from 'dotenv'
import multer from 'multer';

dotenv.config()

const {
    BUCKET_NAME: bucketName,
    BUCKET_REGION: region,
    ACCESS_KEY: accessKeyId,
    SECRET_ACCESS_KEY: secretAccessKey
} = process.env

exports.s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region
})
