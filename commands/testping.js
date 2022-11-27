const { SlashCommandBuilder, EmbedBuilder, InteractionResponse } = require('discord.js');

const pingEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Pong')
	.setDescription(`:ping_pong:`)
	.setTimestamp()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check if the bot is online'),
	async execute(interaction) {
		await interaction.reply({ embeds: [pingEmbed] });
	},
};