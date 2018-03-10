// create a new instance of ChatEngine
// Make sure to import ChatEngine first!
ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-fc81cd0d-4fb1-44e8-bedf-49a85c340373',
    subscribeKey: 'sub-c-1e7e1c34-2419-11e8-9e0d-86843e43dc8b'
});
// use a helper function to generate a new profile
//let newPerson = generatePerson(true);

// create a bucket to store our ChatEngine Chat object
let myChat;

// create a bucket to store 
let me;

// compile handlebars templates and store them for use later
let peopleTemplate = Handlebars.compile($("#person-template").html());
let meTemplate = Handlebars.compile($("#message-template").html());
let userTemplate = Handlebars.compile($("#message-response-template").html());

// this is our main function that starts our chat app
const init = () => {
  
  // connect to ChatEngine with our generated user
  ChatEngine.connect(String(new Date().getTime()), { 
    nickName: "Sharif Niyaz"
});

  // when ChatEngine is booted, it returns your new User as `data.me`
  ChatEngine.on('$.ready', function(data) {

      // store my new user as `me`
      me = data.me;

      // create a new ChatEngine Chat
      myChat = new ChatEngine.Chat('chatengine-demo-chat');

      // when we recieve messages in this chat, render them
      myChat.on('message', (message) => {
          renderMessage(message);
      });

      // when a user comes online, render them in the online list
      myChat.on('$.online.*', (data) => {   
        $('#people-list ul').append(peopleTemplate(data.user));
      });

      // when a user goes offline, remove them from the online list
      myChat.on('$.offline.*', (data) => {
        $('#people-list ul').find('#' + data.user.uuid).remove();
      });
    
      // bind our "send" button and return key to send message
      $('#sendMessage').on('submit', sendMessage)

  });

};

// send a message to the Chat
const sendMessage = () => {

    // get the message text from the text input
    let message = $('#message-to-send').val().trim();
  
    // if the message isn't empty
    if (message.length) {
      
        // emit the `message` event to everyone in the Chat
        myChat.emit('message', {
            text: message
        });

        // clear out the text input
        $('#message-to-send').val('');
    }
    
    // stop form submit from bubbling
    return false;

};

// render messages in the list
const renderMessage = (message) => {

    // use the generic user template by default
    let template = userTemplate;

    // if I happened to send the message, use the special template for myself
    if (message.sender.uuid == me.uuid) {
        template = meTemplate;
    }

    // render the message
    $('.chat-history ul').append(template({
        messageOutput: message.data.text,
        time: getCurrentTime(),
        user: message.sender.state
    }));

    // scroll to the bottom of the chat
    scrollToBottom();

};

// scroll to the bottom of the window
const scrollToBottom = () => {
    $('.chat-history').scrollTop($('.chat-history')[0].scrollHeight);
};

// get the current time in a nice format
const getCurrentTime = () => {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};


// boot the app
init();
