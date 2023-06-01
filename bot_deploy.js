const { Client, GatewayIntentBits, Events, REST, Collection, Routes } = require ("discord.js");
const fs = require ('node:fs');
const path = require ("path");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages] });
const { clientId, token, dblToken, topToken } = require ('./config.json');
const { shards } = require ('./settings.json');
const axios = require ('axios');

//.filter(file => file.endsWith('.js'));


client.once(Events.ClientReady, c => {
	console.log("Bot is online")
    c.user.setActivity('/help')
	console.log("Shard's guilds " + c.guilds.cache.size)

});

process.on("message", message => {
    if (!message.type) return false;

    if (message.type == "shardId") {
		console.log("Shard number " + message.data.shardId + " recieved by child")
		axios({
			method: 'post', //you can set what request you want to be
			url: `https://discordbotlist.com/api/v1/bots/${clientId}/stats`,
			data: {guilds: client.guilds.cache.size, shard_id: message.data.shardId},
			headers: {
			  Authorization: dblToken
			}
		}).catch(e => console.log(e))

		axios({
			method: 'post', //you can set what request you want to be
			url: `https://top.gg/api/bots/${clientId}/stats`,
			data: {server_count: client.guilds.cache.size, shard_id: message.data.shardId, shard_count: shards},
			headers: {
			  Authorization: topToken
			}
		}).catch(e => console.log(e.response.data))

		console.log("Data reported from Shard " + message.data.shardId)
    };
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (interaction.isChatInputCommand(), !interaction.isButton()){

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}} else if (!interaction.isChatInputCommand(), interaction.isButton()) {

	} else {
		return;
	}
});

client.login(token);