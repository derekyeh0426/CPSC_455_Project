const express = require('express');
const app = require('./app');
const http = require('http');
const port = 8080;
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});