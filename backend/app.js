require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

const furnitureRouter = require('./controllers/furniture');

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB:', error.message));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/v1/furnitures', furnitureRouter);

module.exports = app;
