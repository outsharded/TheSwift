const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('Ping')
		.setDescription('Check if the bot is online.'),
	async execute(interaction) {
		await interaction.reply('Thy cocanice');
	},
};