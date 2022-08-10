require('dotenv').config();

const tmi = require('tmi.js');



// Create a client with our options
const client = new tmi.client({
  connection: {
    reconnect: true
  },
	channels: [ 'teglaofficial' ],
  identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	},

})

// Connect to Twitch:
client.connect();

//arrays
const blocked_words = ['zsoze', 'Zsozeval', 'Zsozehoz', 'Zsozéhoz', 'Zsozéval', 'neger', 'néger', 'phub', 'zsozeata', 'zsozeatya', 'nibba', 'zsozéatya', 'zsozeatya', 'zsoze', 'zsizi', 'zsozé', 'dugás', 'pornhub', 'buzi', 'nigga', 'nigger', 'zsizivel', 'zsoz'];
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

  if (message.toLowerCase() === '!szepastreamer') {
    client.say(channel, `Te vagy a szép @${userstate.username}!`);
  }

  if (message.includes("Szia") || message.includes("SZIA") || message.includes("szia")) {
    client.say(channel, `Szia @${userstate.username}! HeyGuys`);
  }

  checkChat(channel, userstate, message);
});

// Called every time a message comes in
function onChatHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  if (commandName === '!dc') {
    client.say(target, 'Csatlakozz Discord szerveremre CZimbi! https://discord.teglastream.hu/');
  }

  if (commandName === '!sub') {
    client.say(target, 'Ha nem működne a sub Nálad czimbi, ezen a linken keresztül próbálkozz! https://www.twitch.tv/subs/teglaofficial');
  }

  if (commandName === '!rules') {
    client.say(target, '--Chatszabályzat-- || Tilos más Streamert említeni! (Kivétel ezalól a Raid/Host. Elsőnek TO-t, aztán Ban-t kapsz érte.) || Tilos más Streamerről kérdezni! (ha kérdésed van, biztos megkapod a !interju parancs alatt lévő videóban!) || -Tilos a Streamert sértően jellemezni. (Természetesen tudjuk mi odaillő és mi nem!) ||');
  }

  if (commandName === '!donate') {
    client.say(target, 'Czimbi. Ezen a linken keresztül tudod támogatni a csatorna működését: https://streamlabs.com/teglaofficial/tip');
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
    client.say(target, 'A chatben használható parancsok: !donate, !sub, !fb, !rp, !interju, !taka, !tiktok, !yt, !rules, !dc');
  }

  if (msg.includes("rp?") || msg.includes("RP?") || msg.includes("Rp?")) {
    client.say(target, "Woof Woof! Jön Hoffmann letépi a kezed ha megint ilyen hülyeséget kérdezel! DansGame");
  }

  if (commandName === '!color') {
    //console.log(client.getChannels());
    client.color(colors[Math.floor(Math.random() * 10)]);
    //change color of bot
    client.say("teglaofficial", "A színem megváltoztatva!");
  }

}

function DiscTimer() {
  client.action('teglaofficial', 'Üzleti dolgokkal kapcsolatban írj egy e-mailt a teglastream@gmail.com címre!');
}
setInterval(DiscTimer, 1500000); //25min

function BussinessTimer() {
  client.action('teglaofficial', 'Csatlakozz Discord szerveremre Czimbi! https://discord.teglastream.hu');
}
setInterval(BussinessTimer, 2500000); //41min

//check twitch chat, delete message which isnt suitable and respond to it
function checkChat(channel, username, message) {
  console.log(username.username, message)
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
