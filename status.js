const { Client, User, PresenceUpdateStatus, ClientPresence } = require('discord.js');
const client = new Client({ intents: [] });

//const myIntents = new IntentsBitField();
//myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers);

//const client = new Client({ intents: myIntents });

//client.user.setPresence({ activities: [{ name: `the Swift Den`,  type: `WATCHING` }] });

//client.user.setActivity('the Swift Den',{type: 'WATCHING'});
ClientPresence.set.activity(0)