const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 9000;

app.set('port', port)
const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server is up on port " + port);
});