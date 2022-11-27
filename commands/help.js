const { SlashCommandBuilder } = require('discord.js');

//for discord.js - commented code unwanted, not removing til tested

const helpEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Help')
//	.setURL('https://discord.js.org/')
//	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Supported commands')
//	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: '/help', value: 'Get a command list.' },
		{ name: '/info', value: 'Server info.' },
		{ name: '/report', value: 'Report an issue/user to the staff team.' },
		{ name: '/ping', value: 'Check if the bot is online.' },
	)
//	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
//	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
//	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get a command list.'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpEmbed] });
	},
};