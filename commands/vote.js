const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const voteEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Vote')
	.setDescription('Thanks for supporting the server!')
	.addFields(
        { name: 'Disboard.org', value: 'Use /bump'},
		{ name: 'Discords.com', value: 'https://discords.com/servers/swift-den/upvote' },
		{ name: 'Top.gg', value: 'https://top.gg/servers/918166237652062228/vote' },
	)
	.setTimestamp()

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote for the server'),
	async execute(interaction) {
		await interaction.reply({ embeds: [voteEmbed] });
	},
};