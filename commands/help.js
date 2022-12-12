const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

//embeds with ccommands
const helpEmbed = new EmbedBuilder()
	.setColor(0x265420)
	.setTitle('Help')
	.setDescription('Supported commands')
	.addFields(
		{ name: '/help', value: 'Get a command list' },
		{ name: '/info', value: 'Server info' },
		{ name: '/ping', value: 'Check if the bot is online' },
		{ name: '/password', value: 'Generate a unique, 20 charachter password.' },
		{ name: '/rps', value: 'Play rock, paper, scissors with the bot.' },
		{ name: '/pingserver', value: 'Ping your server/domain from an external server.' },
		{ name: '/vote', value: 'Vote for the bot' },
		{ name: '/text', value: 'Use the GPT-3 text generation engine to create text!' },
		{ name: '/image', value: 'Use the DALL_E image generation engine to create images!' },
	)
	.setTimestamp()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get a command list.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });
		console.log('Help command - completed')
	},
};