const { SlashCommandBuilder } = require('discord.js');
const timestamp = Math.floor(Date.now() / 1000)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Server info.'),
	async execute(interaction) {
//        let cdate = new Date;
//        cdate = cdate.getDate();
		await interaction.reply(`**${interaction.guild.name}**\n> Date: <t:${timestamp}>\n > Member count: ${interaction.guild.memberCount}`);
	},
};