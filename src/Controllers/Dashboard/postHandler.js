const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const {isUndefined} = require('../../utils/index')
const { InstagramPost  , InstagramPostImage} = require('../../../models/post');

// configure AWS S3 for Liara bucket
const s3 = new AWS.S3({
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  endpoint: process.env.LIARA_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: 'v4'
});

const uploadPost = async (req, res) => {
    const { caption } = req.body;
    const  files = req.files;
   
    try {
      if (isUndefined(files) || files.length <= 0)  throw ({message : 'لطفا فایل وارد کنید'});
      // Create Instagram post
      const instagramPost = await InstagramPost.create({ caption });
      // Upload images to S3 and create image objects
      const imageObjects = [];
      const folderName = process.env.NODE_ENV === 'production' ? 'posts' : 'demoPosts'
      for (const file of req.files) {
        const fileKey = `${folderName}/${uuidv4()}.${file.originalname.split('.').pop()}`;
        const params = {
          Bucket: process.env.LIARA_BUCKET_NAME,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype
        };
        await s3.upload(params).promise();
        const imageUrl = `https://${process.env.LIARA_BUCKET_NAME}.${process.env.LIARA_ENDPOINT}/${fileKey}`;
        const instagramPostImage = await InstagramPostImage.create({ url: imageUrl, post_id: instagramPost.id });
        imageObjects.push(instagramPostImage);
      }
  
      return res.status(201).json({ message: 'پست با موفقیت ساخته شد.' });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      return res.status(500).json(error);
    }
}  

module.exports ={
     uploadPost
}