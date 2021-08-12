require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Image = require('../models/image');
const path = require('path');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretKey,
    region: region
});

const upload =  multer({
    storage: multerS3({
        s3:s3,
        bucket: bucketName,
        metadata:  (req, file, cb) => {
            cb(null, {originalname: file.originalname});
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + path.extname(file.originalname))
        }
    }),
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb(new Error("images only"));
        }
    }
});

const deleteById = (req, res) => {
    Image
        .findByIdAndRemove(req.params.id)
        .then(image => {
            s3.deleteObject({
                Bucket: bucketName,
                Key: image.key
            }, (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                return res.status(200).end();
            });
        }).catch(err => res.status(404).json({ error: 'invalid id' }));
};

const create = (req, res) => {
    const uploadArray = upload.array('photo', 3);
    uploadArray(req, res, err => {
        let imagePromises = [];
        if (err) {
            res.status(404).end();
        }
        req.files.forEach(file => {
            const image = new Image({
                key: file.key,
                imageUrl: file.location
            });
            imagePromises.push(image.save())
        })
        Promise.all(imagePromises).then(savedImages => {
            res.json(savedImages)
            res.status(200).end();
        })
    })
};

const getById = (req, res) => {
    Image
        .findById(req.params.id)
        .then(image => {
            if (image === null) {
                return res.status(404).json({ error: 'invalid id' });
            }

            return res.json(image);
        })
        .catch(err => res.status(500).end());
};

const getAll = (req, res) => {
    Image
        .find({})
        .then(image => res.json(image));
};

module.exports = {
    create,
    getById,
    getAll,
    deleteById
};


