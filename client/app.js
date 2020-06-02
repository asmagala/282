const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messageList = document.getElementById('messages-section__list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

var userName = '';
var i = 0;

function login(e) {
  e.preventDefault();
  if (userNameInput.value) {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  } else {
    alert('Proszę podać swój login.');
  }
};

function sendMessage(e) {
  e.preventDefault();
  if(messageContentInput.value ) {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  } else {
    alert('Nie można wysłać "pustej" wiadomości');
  }
};

function addMessage(uname, txt) {
  console.log('username: ', uname);
  console.log('Message text: ', txt);
};

loginForm.addEventListener('submit', (event) => {
  login(event);
});

addMessageForm.addEventListener('submit', (event) => {
  sendMessage(event);
});