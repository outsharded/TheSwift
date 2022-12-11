const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

//embeds with ccommands
const helpEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Help')
	.setDescription('Supported commands')
	.addFields(
		{ name: '/help', value: 'Get a command list' },
		{ name: '/info', value: 'Server info' },
		{ name: '/ping', value: 'Check if the bot is online' },
		{ name: '/password', value: 'Generate a unique, 20 charachter password.' },
		{ name: '/rps', value: 'Play rock, paper, scissors with the bot.' },
		{ name: '/pingserver', value: 'Ping your server/domain from an external server.' },
		{ name: '/vote', value: 'Vote for the server **Only on the Swift Den**' },
		{ name: '/report', value: 'Report an issue/user to the staff team **Only on the Swift Den**' },
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