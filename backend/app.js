require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const furnitureRouter = require('./controllers/furniture');
const userRouter = require('./controllers/user');


mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB:', error.message));

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/v1/furnitures', furnitureRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
