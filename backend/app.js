const express = require('express');
const app = express();

app.use(express.json());

const furnitureRouter = require('./routers/furniture');

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api/v1/furniture', furnitureRouter);

module.exports = app;