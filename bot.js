const { Client, IntentsBitField, GatewayIntentBits, Events, REST, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const { data } = require("./commands/testping");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages] });
const { token } = require("./config.json");

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}


client.login(token);

client.on(Events.ClientReady, () => {
    console.warn("Bot is online");
    client.user.setActivity('/help')
	return client.shard.fetchClientValues('guilds.cache.size')
			.then(results => {
				return console.log(`Server count: ${results.reduce((acc, guildCount) => acc + guildCount, 0)}`);
			})
			.catch(console.error);
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


