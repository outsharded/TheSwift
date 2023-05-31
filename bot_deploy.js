const { Client, GatewayIntentBits, Events, REST, Collection, Routes } = require ("discord.js");
const fs = require ('node:fs');
const path = require ("path");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages] });
const { clientId, token, discordsToken } = require ('./config.json');
const axios = require ('axios');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath)
//.filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}


client.login(token);

client.on(Events.ClientReady, () => {
//start deploying commands	
const commands = [];
const commandFiles = fs.readdirSync('./commands')
//.filter(file => file.endsWith('.js', or, '.ts'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

    console.warn("Bot is online");
    client.user.setActivity('/help')
	return client.shard.fetchClientValues('guilds.cache.size')
			.then(results => {
			const servers = results.reduce((acc, guildCount) => acc + guildCount, 0)
			console.log(servers)
			//axios.post(`https://discords.com/bots/api/bot/${clientId}`, server_count = servers, ['Authorization'] = "507449adfc197d8a5074fc0405df0c68e14cec7692729d0bd7cc1bc38cbf3eb6491a5edfb3e35f4e3b812b3dafcad39a49240e1a7f95bb18cba18d22114f1960").catch(console.log(error))

			axios({
				method: 'post', //you can set what request you want to be
				url: `https://discords.com/bots/api/bot/${clientId}`,
				data: {server_count: servers},
				headers: {
				  Authorization: discordsToken
				}
			}).catch(e => console.log(e))

			return console.log(`Server count: ${results.reduce((acc, guildCount) => acc + guildCount, 0)}`);
			})
			.catch(console.error);
});


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

