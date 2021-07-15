require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Image = require('../models/image');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretKey,
    region: region
})

const upload =  multer({
    storage: multerS3({
        s3:s3,
        bucket: bucketName,
        metadata:  (req, file, cb) => {
            cb(null, {originalname: file.originalname});
        },
        key: (req, file, cb) => {
            console.log(file)
            cb(null, Date.now().toString())
        }
    })
});

const create = (req, res, next) => {
    const uploadArray = upload.array('photo', 3);
    uploadArray(req, res, next => {
        let jsonArray = [];
        req.files.forEach(file => {
            const image = new Image({
                imageUrl: file.location
            });
            image
                .save()
        })
        res.status(200).end();
    })
}

module.exports = {
    create
};


