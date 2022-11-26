const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('bans someone')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban')
				.setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason for banning'))
                        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                        .setDMPermission(false),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        await interaction.reply(`Banning ${target} for ${reason}`)
        await interaction.guild.members.ban(target);
	},
};