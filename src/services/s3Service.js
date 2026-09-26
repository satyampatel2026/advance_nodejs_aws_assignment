const {PutObjectCommand,DeleteObjectCommand,GetObjectCommand}=require("@aws-sdk/client-s3");
const {getSignedUrl}=require('@aws-sdk/s3-request-presigner');
const {v4: uuidv4}=require('uuid');
const path = require("path");
const s3Client=require('../config/awsConfig');

const generatePresignedUrl=async(key)=>{
    const command=new GetObjectCommand({
        Bucket:process.env.AWS_S3_BUCKET,
        Key:key,
    })
    const url=await getSignedUrl(s3Client,command,{expiresIn:3600});
    return url;
}
const uploadToS3=async(file,userId)=>{
    const ext = path
    .extname(file.originalname)
    .toLowerCase();

  const safeName = path
    .basename(file.originalname, ext)
    .replace(/[^a-zA-Z0-9-_]/g, "_");

  const key = `documents/${userId}/${uuidv4()}-${safeName}${ext}`;
  
    await s3Client.send( new PutObjectCommand({
        Bucket:process.env.AWS_S3_BUCKET,
        Key:key,
        Body:file.buffer,
        ContentType:file.mimetype
    })
   )
   const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
   return {key, s3Url};
}

const deleteFromS3=async(key)=>{
    await s3Client.send(new DeleteObjectCommand({
        Bucket:process.env.AWS_S3_BUCKET,
        Key:key
    }))
}   

module.exports={uploadToS3,deleteFromS3,generatePresignedUrl};
