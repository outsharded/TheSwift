const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const voteEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Vote')
	.setDescription('Thanks for supporting the server!')
	.setTimestamp()

const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setURL('https://top.gg/servers/918166237652062228/vote')
            .setLabel('Top.gg')
            .setStyle(ButtonStyle.Link),
        new ButtonBuilder()
            .setLabel('Discords.com')
            .setURL('https://discords.com/servers/swift-den/upvote')
            .setStyle(ButtonStyle.Link),
    );

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote for the server'),
	async execute(interaction) {
		await interaction.reply({ embeds: [voteEmbed], components: [row] });
        console.log('Vote commands - completed')
	},
};