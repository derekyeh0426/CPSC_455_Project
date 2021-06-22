require('dotenv').config();

const PORT = process.env.PORT;
const app = require('./app');
const http = require('http');
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Pfiniture app listening at http://localhost:${PORT}`));