const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('gives info on stuff'),
	async execute(interaction) {
        let cdate = new Date;
        cdate = cdate.getTime() + cdate.getDate();
		await interaction.reply(`> Date: ${cdate}, User: ${interaction.user.username}\n> JoinD: ${interaction.member.joinedAt}, Guildid: ${interaction.guild.id} (of name) ${interaction.guild.name}\n > Member count: ${interaction.guild.memberCount}`);
	},
};