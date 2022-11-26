const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('kicks someone')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to kick')
				.setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason for kicking'))
                        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                        .setDMPermission(false),
	async execute(interaction) {
		const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        await interaction.reply(`Kicking ${target} for ${reason}`)
        await interaction.guild.members.kick(target);
	},
};