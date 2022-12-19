const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check if the bot is online'),
	async execute(interaction) {
		//define first response
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		//send response
		sent
		//then update message with ping
		const pinged = new EmbedBuilder()
			.setColor(0x5c95b5)
			.setTitle(`Pong! :ping_pong`)
			.addFields(
				{ name: 'Roundtrip latency', value: `${sent.createdTimestamp - interaction.createdTimestamp}` },
			)
			.setTimestamp()
		interaction.editReply({ content: '', embeds: [pinged] });
		console.log('Ping command - completed')
	},
};
