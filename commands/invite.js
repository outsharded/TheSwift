const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { colour } = require("../settings.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Add the bot to your server!'),
	async execute(interaction) {
		//define first response
        const button = new ButtonBuilder()
            .setLabel('Invite me!')
            .setURL('https://discord.com/api/oauth2/authorize?client_id=1045760873316229193&permissions=269224960&scope=bot%20applications.commands')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(button);

		interaction.reply({ content: 'Enjoy my features on your own server.', components: [row] });
		console.log('invite command - completed')
	},
};
