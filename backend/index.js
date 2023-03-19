const connectToMongo=require('./db')
const express = require('express')
var cors=require('cors')
const http = require('http');
const socketIO = require('socket.io');
connectToMongo();
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 5000
app.use(cors())
app.use(express.json())

const channels = {}; // Store channels and messages associated with each channel

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle a new chat message from a client
  socket.on('newMessage', ({ message, channel }) => {
    console.log('New message received:', message, channel);

    // Add the new message to the channel's message list
    if (!channels[channel]) {
      channels[channel] = [];
    }
    channels[channel].push(message);

    // Broadcast the new message to all connected clients in the same channel
    io.to(channel).emit('newMessage', message);
  });

  // Handle joining a channel
  socket.on('joinChannel', (channel) => {
    console.log('Client joined channel:', channel);
    socket.join(channel);

    // Send the channel's message history to the new client
    if (channels[channel]) {
      socket.emit('messageHistory', channels[channel]);
    }
  });

  // Handle the socket disconnect event
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
app.use("/api/auth",require("./routes/auth"))
app.use("/api/upload",require("./routes/upload"))



app.listen(port, () => {
  console.log(`listening to ${port}`)
})
