const { SlashCommandBuilder, EmbedBuilder, IntegrationExpireBehavior, PermissionsBitField, PermissionFlagsBits  } = require('discord.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Warn = require('../models/WarnSchema');
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true, })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warns')
		.setDescription('Get the warnings from this guild.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({ content: "You cannot see warns!", ephemeral: true })
        } else {
        try {
        const warnsGuild = await Warn.find({ guildId: interaction.guild_id });
        console.log(warnsGuild)
        let wLen = warnsGuild.length;

        let text = " ";
        for (let i = 0; i < wLen; i++) {
          text += '<@' + warnsGuild[i].userId + '> for ' + warnsGuild[i].reason + '\n';
        }

        const warnsEmbed = new EmbedBuilder()
            .setColor(0x5c95b5)
            .setTitle('Warnings in this server:')
            .setDescription(text)
            .setTimestamp()    
        await interaction.reply({ embeds: [warnsEmbed]});
    } catch (error) {
        await interaction.reply(error.message);
        console.warn(`Text command failed.`)
    }
    }
		console.log('warns command - completed')
	},
};