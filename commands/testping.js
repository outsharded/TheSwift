const { SlashCommandBuilder } = require('discord.js');

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
		interaction.editReply(`Pong! :ping_pong:\n**Roundtrip latency:** ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
		//await interaction.reply({ embeds: [pingEmbed] });
		console.log('Ping command - completed')
	},
};
