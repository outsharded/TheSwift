const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hell')
		.setDescription('Hell'),
	async execute(interaction) {
		await interaction.reply('Hell');
	},
};