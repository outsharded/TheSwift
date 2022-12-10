const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Server info'),
	async execute(interaction) {
		//unix time, put into seconds to match discord timestamp
		const timestamp = Math.floor(Date.now() / 1000)
		await interaction.reply(`**${interaction.guild.name}**\n> Date: <t:${timestamp}>\n> User: <@${interaction.user.id}>\n> Member count: ${interaction.guild.memberCount}`);
		console.log('Info command - completed')
	},
};