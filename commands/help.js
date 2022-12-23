const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');





//embeds with ccommands
const helpEmbed1 = new EmbedBuilder()
	.setColor(0x5c95b5)
	.setTitle('Most Used')
	.setDescription('Supported commands')
	.addFields(
		{ name: '/help', value: 'Get a command list' },
		{ name: '/ai', value: 'Use AI to generate text, images and code' },
		{ name: '/info', value: 'Server info' },
		{ name: '/ping', value: 'Check if the bot is online' },
		{ name: '/password', value: 'Generate a unique, 20 charachter password.' },
		{ name: '/rps', value: 'Play rock, paper, scissors with the bot.' },
		{ name: '/pingserver', value: 'Ping your server/domain from an external server.' },
		{ name: '/vote', value: 'Vote for the bot' },
		{ name: '/stack', value: 'Search for your issue on StackOverflow and reurn the top post' },
	)
	.setFooter({ text: 'Page 1/2' })
	.setTimestamp()
//page 2
	const helpEmbed2 = new EmbedBuilder()
	.setColor(0x5c95b5)
	.setTitle('Admin/Moderator')
	.setDescription('Supported commands')
	.addFields(
		{ name: '/warn', value: 'Warns a user.' },
		{ name: '/warns', value: 'Gets all warns in the server of for a user.' },
		{ name: '/removewarns', value: 'Remove a warn.' },
		{ name: '/timeout', value: `Timeouts a user (up to 28 days)` },
		{ name: '/purge', value: `Removes the specified number of messages from a channel` },
	)
	.setFooter({ text: 'Page 2/2' })
	.setTimestamp()


//buttons

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get a command list.')
		.addStringOption(option =>
            option
                .setName('page')
                .setDescription('Page of the command list.')
                .setRequired(true)
				.addChoices(
					{ name: 'Most Used', value: '1' },
					{ name: 'Admin/Moderator', value: '2' },
				)),
	async execute(interaction) {
		if (interaction.options.getString() === "1") {
		await interaction.reply({ embeds: [helpEmbed1]})
		} else {
		await interaction.reply({ embeds: [helpEmbed2], ephemeral: true })
		}
		console.log('Help command - completed')
	},
};

