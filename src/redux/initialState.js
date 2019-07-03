const initialState = {
  username: '',
  message: '',
  messageList: [],
  connectedUsers: 0,
  socket: new WebSocket('ws://localhost:3001')
}

export default initialState