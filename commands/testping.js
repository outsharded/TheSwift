const { SlashCommandBuilder, EmbedBuilder, InteractionResponse, WebSocketManager } = require('discord.js');


const pingEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Hello!')
	.setDescription(`Pong :ping_pong:`)
	.setTimestamp()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check if the bot is online'),
	async execute(interaction) {
		await interaction.reply({ embeds: [pingEmbed] });
	},
};