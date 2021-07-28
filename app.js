require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors());
app.options('*', cors());

const furnitureRouter = require('./controllers/furniture');
const userRouter = require('./controllers/user');
const imageRouter = require('./controllers/image');
const listingRouter = require('./controllers/listing');

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB:', error.message));

app.use('/api/v1/furnitures', furnitureRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/listings', listingRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/pfiniture/build'));
}

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/pfiniture/build/index.html"));
});


module.exports = app;
