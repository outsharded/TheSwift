const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createreactionrole')
		.setDescription('what do you think')
        .addStringOption(option =>
            option
                .setName("Message")
                .setDescription("The message to send with the role")
                .setRequired(true)
                .addStringOption(option =>
                    option
                        .setName("Role")
                        .setDescription("The role to give them") 
                        .setRequired(true)
                        .addStringOption(option => 
                            option
                                .setName("Emoji")
                                .setDescription("The Reaction to give to it")
                                .setRequired(true)
                            )   
                    )
            ),
	async execute(interaction) {
        const msg = interaction.channel.send(interaction.options.getString("Message"));
        msg.react(interaction.options.getString("Emoji"));
		console.log('Create Reaction Role command - completed')
	},
};
