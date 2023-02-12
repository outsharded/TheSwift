const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Server info'),
	async execute(interaction) {
		//unix time, put into seconds to match discord timestamp
		const timestamp = Math.floor(Date.now() / 1000)
		const pinged = new EmbedBuilder()
		.setColor(0x5c95b5)
		.setTitle(`${interaction.guild.name}`)
		.addFields(
			{ name: 'Member count', value: `${interaction.guild.memberCount}` },
			{ name: 'Date', value: `<t:${timestamp}>` },
			{ name: 'User', value: `<@${interaction.user.id}>` },
		)
		.setTimestamp()
		await interaction.reply({ embeds: [pinged] });
		console.log('Info command - completed')
	},
};
