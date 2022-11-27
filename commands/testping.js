const { SlashCommandBuilder, EmbedBuilder, InteractionResponse } = require('discord.js');

const pingEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Pong')
	.setDescription(`:ping_pong: ${Date.now() - Interaction.setTimestamp}ms`)
	.addFields(
		{ name: '/help', value: 'Get a command list.' },
		{ name: '/info', value: 'Server info.' },
		{ name: '/report', value: 'Report an issue/user to the staff team.' },
		{ name: '/ping', value: 'Check if the bot is online.' },
	)
	.setTimestamp()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Check if the bot is online'),
	async execute(interaction) {
		await interaction.reply({ embeds: [pingEmbed] });
	},
};