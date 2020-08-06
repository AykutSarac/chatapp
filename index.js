const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ejs = require('ejs');
const path = require('path');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const router = require('./routes/Chat');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', ejs.__express);
app.set('views', __dirname+'/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(router);

io.on('connection', socket => {
    console.log("New WS Connection...");

    socket.emit('message', formatMessage('System', 'Welcome to ChatChord!'));

    //  Broadcast when an user connect
    socket.broadcast.emit('message', formatMessage('System', 'User has joint the chat.'));

    socket.on('disconnet', () => {
        io.emit('message', formatMessage('System', 'User has left the chat.'));
    });

    //  Listen for chat message
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('User' , msg));
    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log("Listening app on http://localhost:" + PORT);
});