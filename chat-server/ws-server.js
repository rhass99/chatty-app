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

// Called every time a new message is recieved, decides if the username changed or not
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

// Called every time a new message is recieved, adds 
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
      newusername: msg.user
    },{
      type: "txt",
      id: Math.random().toString().replace('0.', ''),
      text: msg.text,
      user: msg.user
    }]
  } else {
    console.log(userList)
    return [{
      type: "txt",
      id: Math.random().toString().replace('0.', ''),
      text: msg.text,
      user: msg.user
    }]
  }
}

const broadcast = (msg) => {
  io.clients.forEach(x => x.send(JSON.stringify(msg)))
}

io.on('connection', (ws) => {
  connected(ws)
  // Do something on new connection
  // Generate new clientID and adds it to the connection object
  // New anonymous has joined a chat - sys message
  ws.on('message', (message) => {
    const msg = newMessage(ws, JSON.parse(message))
    broadcast(msg)
    // Do something on new message
    // Check for username with the clientID
    // if username matches, fine, if not send 2 msgs change and msg

  });
  ws.on('close', () => {
    // Done do nothing
  })
});