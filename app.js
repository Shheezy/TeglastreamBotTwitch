require('dotenv').config();

const tmi = require('tmi.js');



// Create a client with our options
const client = new tmi.client({
  connection: {
    reconnect: true
  },
	channels: [ 'shheezyart' ],
  identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},

})

// Connect to Twitch:
client.connect();

//arrays
const blocked_words = ['bababoii', 'trip', 'cats'];
const colors = ["SpringGreen", "Blue", "Chocolate", "Red", "Coral", "Firebrick", "OrangeRed", "SeaGreen", "Green", "HotPink"];
//colors.toString();


// Register our event handlers (defined below)
client.on('chat', onChatHandler);
client.on('connected', onConnectedHandler);
client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  //if (userstate.username === BOT_USERNAME) return;
  if (message.toLowerCase() === '!test') {
    client.say(channel, `@${userstate.username}, a bot tesztelése sikeres!`);
  }
  checkChat(channel, userstate, message);
});

// Called every time a message comes in
function onChatHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  if (commandName === '!social') {
    client.say(target, `socials at www.twitter.com/pepega and www.pepega.com`);
  }

  if (commandName === '!dc') {
    client.say(target, 'Csatlakozz Discord szerveremre CZimbi! https://discord.teglastream.hu/');
  }

  if (commandName === '!rules') {
    client.say(target, '--Chatszabályzat-- || Tilos más Streamert említeni! (Kivétel ezalól a Raid/Host. Elsőnek TO-t, aztán Ban-t kapsz érte.) || Tilos más Streamerről kérdezni! (ha kérdésed van, biztos megkapod a !interju parancs alatt lévő videóban!) || -Tilos a Streamert sértően jellemezni. (Természetesen tudjuk mi odaillő és mi nem!) ||');
  }

  if (commandName === '!donate') {
    client.say(target, '	Czimbi. Ezen a linken keresztül tudod támogatni a csatorna működését: https://streamlabs.com/teglaofficial/tip');
  }

  if (commandName === '!fb') {
    client.say(target, 'Megköszönöm czimbim ha Facebook-on is bekövetsz.https://www.facebook.com/Teglaofficial');
  }

  if (commandName === '!interju') {
    client.say(target, 'Kérdésedre több választ itt találsz: https://www.youtube.com/watch?v=GwCPgxAq2UI&ab_channel=TFKChannel');
  }

  if (commandName === '!rp') {
    client.say(target, 'A 4MA Roleplay Discord szervere: https://discord.gg/4maroleplay');
  }

  if (commandName === '!tiktok') {
    client.say(target, 'Elérhető vagyok TikTok-on is Czimbi. Dobom is a linket.https://www.tiktok.com/@tegla_official');
  }

  if (commandName === '!yt') {
    client.say(target, 'Ez a YouTube csatim. Megköszönöm ha feliratkozol ott is. ;)https://www.youtube.com/TeglaOfficial');
  }

  if (commandName === '!taka') {
    client.say(target, 'Nem bírsz viselkedni?!!?Jön Jusztika és el takarít a lépcsőházból!!');
  }

  if (commandName === '!parancsok') {
    client.say(target, 'A chatben használható parancsok: !donate, !fb, !rp, !interju, !taka, !tiktok, !yt, !rules, !dc');
  }

  if (msg.includes("Szia") || msg.includes("SZIA") || msg.includes("szia")) {
    client.say(target, "Szia Czimbi! HeyGuys");
  }

  if (commandName === '!color') {
    //console.log(client.getChannels());
    client.color(colors[Math.floor(Math.random() * 10)]);
    //change color of bot
    client.say("shheezyart", "A színem megváltoztatva!");
  }

}

function DiscTimer() {
  client.action('shheezyart', 'Üzleti dolgokkal kapcsolatban írj egy e-mailt a teglastream@gmail.com címre!');
}
setInterval(DiscTimer, 1.8e+6); //30min

function BussinessTimer() {
  client.action('shheezyart', 'Csatlakozz Discord szerveremre Czimbi! https://discord.teglastream.hu');
}
setInterval(BussinessTimer, 1.26e+6); //21min

//check twitch chat, delete message which isnt suitable and respond to it
function checkChat(channel, username, message) {
  console.log(message)
  message = message.toLowerCase()
  let shouldSendMessage = false
  shouldSendMessage = blocked_words.some(blockedWord => message.includes(blockedWord.toLowerCase()))
  if (shouldSendMessage) {

    client.say(channel, `@${username.username} csak óvatosan, rossz vizekre evezel!`)

    client.deletemessage(channel, username.id)

  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Csatlakozva ide: ${addr}:${port}`);
  //client.say('Lonermoan', `connected to ${addr} and ${port}`)fast;
}
