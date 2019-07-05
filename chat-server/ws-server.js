const app = require('./http-server');

const server = require('http').createServer(app);
const WebSocketServer = require('ws');
const generateMD5Hash = require('./utils');

const io = new WebSocketServer.Server({
  server,
  clientTracking: true
});

const port = 3001;

server.listen(port, () => {console.log(`Server started on port: ${port}`)});

let userList = []

// Called with every new connection and creates a ClientID
const connected = (ws) => { 
  const id = generateMD5Hash(Math.random().toString())
  ws["ChatClientID"] = id
}

// Called every time a new message is recieved
// Checks if this is the first msg for this user
// Checks if the user changed his username
//
const checkUsername = (ws, msg) => {
  for(let user of userList) {
    if (user.ChatClientID === ws.ChatClientID) {
      if (user.username === msg.user) {
        return false
      } else {
        return user.username
      }
    }
  }
  userList.push({
    ChatClientID: ws.ChatClientID,
    username: msg.user
  })
  return false
}

// Called every time a new message is recieved
// Creates the message to be broadcasted to clients
const newMessage = (ws, msg) => {
  const oldUsername = checkUsername(ws, msg)
  if (oldUsername) {
    for (let user of userList) {
      if (user.ChatClientID === ws.ChatClientID) {
        user.username = msg.user
      }
    }

    return [{
      id: Math.random().toString().replace('0.', ''),
      type: "sys",
      oldusername: oldUsername,
      newusername: msg.user,
      purpose:"text"
    },{
      type: "txt",
      id: Math.random().toString().replace('0.', ''),
      text: msg.text,
      user: msg.user,
      purpose:"text"
    }]
  } else {

    return [{
      type: "txt",
      id: Math.random().toString().replace('0.', ''),
      text: msg.text,
      user: msg.user,
      purpose:"text"
    }]
  }
}

// Broadcasts msgs to all connected users
const broadcast = (msg) => {
  io.clients.forEach(x => x.send(JSON.stringify(msg)))
}

// io is the websocket server
io.on('connection', (ws) => {
  broadcast([{
    purpose:"count",
    count:io.clients.size
  }])
  connected(ws)
  ws.on('message', (message) => {
    const msg = newMessage(ws, JSON.parse(message))
    broadcast(msg)
  });
  ws.on('close', () => {
    broadcast([{
      purpose:"count",
      count:io.clients.size
    }])
  })
});