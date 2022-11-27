const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

//was woman command. got dewomanised. bleeding heart liberals, ey?
module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Report an issue/user to the staff team.')
		.addStringOption(option =>
			option
				.setName('report')
				.setDescription('Describe your issue. Ping users if you are reporting them.')
				.setRequired(true)),
	async execute(interaction) {
        const report = interaction.options.getString('reason');

        await interaction.reply({ content: `Thank you for your report. Report: ${reason}`, ephemeral: true });
        
	},
};