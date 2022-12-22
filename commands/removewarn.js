const { SlashCommandBuilder, EmbedBuilder, IntegrationExpireBehavior, PermissionsBitField, PermissionFlagsBits  } = require('discord.js');
const mongoose = require('mongoose');
const Warn = require('../models/WarnSchema');

mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removewarn')
		.setDescription('Remove a warning.')
        .addStringOption(option =>
            option
                .setName('id')
                .setDescription('ID of warning: get it from /warns.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({ content: "You are not allowed to remove warns!", ephemeral: true })
        } else {
        const id = interaction.options.getString("id")
        try {
        const warn = await Warn.find({ _id: id });
        console.log(warn)
        
        await warn[0].remove();
        const remwarnsEmbed = new EmbedBuilder()
            .setColor(0x5c95b5)
            .setTitle('Sucessfully removed warning.')
            .setDescription(`Removed warn ${id}.`)
            .setTimestamp()    
        await interaction.reply({ embeds: [remwarnsEmbed]});
    } catch (error) {
        await interaction.reply(error.message);
        console.warn(`Text command failed.`)
    }
    }
		console.log('removewarn command - completed')
	},
};