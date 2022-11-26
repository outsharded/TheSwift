const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('womans someone')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to woman')
				.setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('The reason for womaning'))
                        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
                        .setDMPermission(false),
	async execute(interaction) {
		const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason');

        await interaction.reply(`Womaning ${target} for ${reason}`);
        target.roles.add("1046123407244263465");
	},
};