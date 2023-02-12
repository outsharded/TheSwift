const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');





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
		{ name: '/security', value: 'Create passwords and decrypt/encrypt strings.' },
		{ name: '/rps', value: 'Play rock, paper, scissors with the bot.' },
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
			{ name: '/settings', value: `Modify settings for the bot` },
		)
		.setFooter({ text: 'Page 2/2' })
		.setTimestamp()


//buttons
const row = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('page1')
		.setLabel('Most Used')
		.setStyle(ButtonStyle.Primary))
.addComponents(
	new ButtonBuilder()
		.setCustomId('page2')
		.setLabel('Admin/Moderator')
		.setStyle(ButtonStyle.Primary),
);

const inactiverow = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('page1')
		.setLabel('Most Used')
		.setStyle(ButtonStyle.Primary)
		.setDisabled(true))
.addComponents(
	new ButtonBuilder()
		.setCustomId('page2')
		.setLabel('Admin/Moderator')
		.setStyle(ButtonStyle.Primary)
		.setDisabled(true)
);


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
		const page = interaction.options.getString('page')
		if (page == '1') {
		await interaction.reply({ embeds: [helpEmbed1], components: [row] })
		} else if (page == '2') {
		await interaction.reply({ embeds: [helpEmbed2], components: [row] })
		}
		const filter = i => i.user.id === interaction.user.id;

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			if (i.customId === 'page1') {
				await i.update({ embeds: [helpEmbed1], components: [row] });
			} else if (i.customId === 'page2') {
				await i.update({ embeds: [helpEmbed2], components: [row] });
			}
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`, interaction.editReply({components: [inactiverow] }))),
		console.log('Help command - completed')
	},
};
			
