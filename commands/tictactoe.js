const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

//embeds with ccommands

//buttons
const row1 = new ActionRowBuilder()
.addComponents(
	new ButtonBuilder()
		.setCustomId('1')
		.setLabel('Most Used')
		.setStyle(ButtonStyle.Primary))
.addComponents(
	new ButtonBuilder()
		.setCustomId('2')
		.setLabel('Admin/Moderator')
		.setStyle(ButtonStyle.Primary))
.addComponents(
	new ButtonBuilder()
		.setCustomId('3')
		.setLabel('Admin/Moderator')
		.setStyle(ButtonStyle.Primary))

		const row2 = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('4')
				.setLabel('Most Used')
				.setStyle(ButtonStyle.Primary))
		.addComponents(
			new ButtonBuilder()
				.setCustomId('5')
				.setLabel('Admin/Moderator')
				.setStyle(ButtonStyle.Primary))
		.addComponents(
			new ButtonBuilder()
				.setCustomId('6')
				.setLabel('Admin/Moderator')
				.setStyle(ButtonStyle.Primary))

		const row3 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('7')
						.setLabel('Most Used')
						.setStyle(ButtonStyle.Primary))
				.addComponents(
					new ButtonBuilder()
						.setCustomId('8')
						.setLabel('Admin/Moderator')
						.setStyle(ButtonStyle.Primary))
				.addComponents(
					new ButtonBuilder()
						.setCustomId('9')
						.setLabel('Admin/Moderator')
						.setStyle(ButtonStyle.Primary))
						


module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get a command list.')
		.addStringOption(option =>
            option
                .setName('page')
                .setDescription('Page of the command list.')
                .setRequired(true)
				.addChoices(
					{ name: 'Most Used', value: '1' },
					{ name: 'Admin/Moderator', value: '2' },
				)),
	async execute(interaction) {
		const page = interaction.options.getString('page')
		if (page == '1') {
		await interaction.reply({ embeds: [helpEmbed1], components: [row] })
		} else if (page == '2') {
		await interaction.reply({ embeds: [helpEmbed2], components: [row] })
		}
		const filter = i => i.user.id === interaction.user.id;

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

		collector.on('collect', async i => {
			if (i.customId === 'page1') {
				await i.update({ embeds: [helpEmbed1], components: [row] });
			} else if (i.customId === 'page2') {
				await i.update({ embeds: [helpEmbed2], components: [row] });
			}
		});

		collector.on('end', collected => console.log(`Collected ${collected.size} items`, interaction.editReply({components: [inactiverow] }))),
		console.log('Help command - completed')
	},
};
			
