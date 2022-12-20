const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge messages.')
        .addIntegerOption(option =>
			option
				.setName('messages')
				.setDescription('how many messages to delete.')
				.setRequired(true)),
	async execute(interaction) {
		//define first response
        const numMessages = interaction.options.getInteger("messages")
		//then update message with ping
        interaction.channel.bulkDelete(numMessages).then(() => {
            interaction.reply({ content: `Deleted ${numMessages} messages.`, ephemeral: true })
          }).catch(error => {
            console.error(error);
            interaction.reply('Error deleting messages.');
          });
		console.log('Purge command - completed')
	},
};