const { SlashCommandBuilder, EmbedBuilder, IntegrationExpireBehavior, PermissionsBitField, PermissionFlagsBits  } = require('discord.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

mongoose.set('strictQuery', true);
const Warn = require('../models/WarnSchema');
mongoose.connect('mongodb://127.0.0.1:27017/warns', { useNewUrlParser: true, useUnifiedTopology: true, })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userwarns')
		.setDescription('Get the warnings for a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to warn.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({ content: "You cannot see warns!", ephemeral: true })
        } else {
        const user = interaction.options.getUser("user")
        try {
        const warnsUser = await Warn.find({ guildId: interaction.guild.id, userId: user.id });
        console.log(warnsUser)
        let wLen = warnsUser.length;
        let text = "";
        for (let i = 0; i < wLen; i++) {
          text += '<@' + warnsUser[i].modId + '> warned <@' + warnsUser[i].userId + '> for ' + warnsUser[i].reason + ':\n**ID**: ' + warnsUser[i]._id + '\n\n';
        }

        const warnsEmbed = new EmbedBuilder()
            .setColor(0x5c95b5)
            .setTitle(`Warnings for ${user.username}`)
            .setDescription(text)
            .setTimestamp()    
        await interaction.reply({ embeds: [warnsEmbed]});
    } catch (error) {
        await interaction.reply(error.message);
        console.warn(`Text command failed.`)
    }
    }
		console.log('userwarns command - completed')
	},
};