const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get a command list.'),
	async execute(interaction) {
        let cdate = new Date;
        cdate = cdate.getTime() + cdate.getDate();
		await interaction.reply(`**${interaction.guild.name}\n**> Date: ${cdate}\n > Member count: ${interaction.guild.memberCount}`);
	},
};