const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { colour } = require("../settings.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Info on server and bot shard'),
	async execute(interaction) {
		//unix time, put into seconds to match discord timestamp
		let guilds;
		const timestamp = Math.floor(Date.now() / 1000)
		const client = interaction.client
		await client.shard.fetchClientValues('guilds.cache.size')
			.then(results => {
			guilds = (`${results.reduce((acc, guildCount) => acc + guildCount, 0)} total servers`);
			})
			.catch(console.error);

		const pinged = new EmbedBuilder()
			.setColor(colour)
			.setTitle(`${interaction.guild.name}`)
			.addFields(
				{ name: 'Member count', value: `${interaction.guild.memberCount}` },
				{ name: 'Date', value: `<t:${timestamp}>` },
				{ name: 'User', value: `<@${interaction.user.id}>` },
				{ name: 'Server count', value: guilds },
				{ name: "Shards's servers", value: `${client.guilds.cache.size}`}
			)
		.setTimestamp()
		await interaction.reply({ embeds: [pinged] });
		console.log('Info command - completed')
	},
};
