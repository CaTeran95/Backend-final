const messageInput = document.querySelector('#message');
const messagesList = document.querySelector('#messages');

const sendMessage = () => {
  const message = messageInput.value;
  if (message === '') {
    alert('You should introduce a message');
  } else {
    socket.emit('message', { message });
  }
};

socket.on('newMessage', (info) => createMessage(info));

const createMessage = (info) => {
  const newMessage = document.createElement('li');
  newMessage.innerHTML = `
    <li>
      <img src="${info.user.avatar}" alt="User image"/>
      <p>${info.user.alias}</p>
      <p>${info.createdAt}</p>
      <p>${info.body}</p>
    </li>
  `;
  messagesList.appendChild(newMessage);
};
