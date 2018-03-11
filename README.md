Live chat application using Pubnub.

Utilizing ChatEngine framework provided by Pubnub to build a chat application which can be installed in any website to interact with the visitors.

Steps:
1. Creating an instance of ChatEngine with our publishKey:" ", subscribeKey:"". We can get these keys once we create a pubnub account.

2.  ChatEngine.connect() serves the purpose of connecting to the chat engine with uniqueid(uuid) and a name.

3. A channel(peer-peer) is then established using ChatEngine.Chat() instantiation myChat = new ChatEngine.Chat("something");

Functions of ChatEngine:
emit() to send a message
.on("param", "incoming")
when we receive a message it is detected in myChat and we render accordingly. If we receive presence data such as if a user connected to the channel goes offline we receives that information. And we render the users presence.

To detect the presence of a connected user, pubnub(sdk) server sends heartBeat periodically. We can set the time period according to our requirement.


Handlebars semantic template language is used in our application.

