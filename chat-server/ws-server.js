const app = require('./http-server');

const server = require('http').createServer(app);
const WebSocketServer = require('ws');

const io = new WebSocketServer.Server({server});

const port = 3001;

server.listen(port, () => {console.log(`Server started on port: ${port}`)});

let connections = [];

const disconnected = () => {
  console.log("Client Disconnected")
};
const connected = () => {
  console.log("Client Connected")
}

io.on('connection', (ws) => {
  connections.push(ws)
  ws.on('message', (message) => {
    connections.forEach(x => x.send(message))
  });
 
  ws.send('something');
});