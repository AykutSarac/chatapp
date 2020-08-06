const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chatbubble');

const socket = io();

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//  Message Submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg  = e.target.elements.msg.value;
    
    //  Emit
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = '';
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('chatbubble');
    div.classList.add('right');
    div.innerHTML = `<b>${message.username}</b> <img src="/img/avatar_default.png" alt="user avatar"><i class="timestamp">${message.time}</i><p>${message.text}</p>`
    document.querySelector('.chat').appendChild(div);
}