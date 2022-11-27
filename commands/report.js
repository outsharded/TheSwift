const { SlashCommandBuilder, Client  } = require('discord.js');
const client = new Client({ intents: [] });

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
		await interaction.reply({ content: 'Thanks! The staff team will review your report as soon as possible.', ephemeral: true });
		const report = interaction.options.getString('report');
		console.log(`**${interaction.member.user.username}** has reported **${report}**.`);
		interaction.channel.send(`<@&981927885340295209>`);
	},
};