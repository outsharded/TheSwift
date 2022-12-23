const { SlashCommandBuilder, EmbedBuilder, IntegrationExpireBehavior, PermissionsBitField, PermissionFlagsBits  } = require('discord.js');
const mongoose = require('mongoose');
const Warn = require('../models/WarnSchema');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/warns', { useNewUrlParser: true, useUnifiedTopology: true, })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User to warn.')
                .setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Reason for warn.')
				.setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            await interaction.reply({ content: "You are not allowed to warn members!", ephemeral: true })
        } else {
        const user = interaction.options.getUser("user")
        const reason = interaction.options.getString("reason") ?? 'No reason provided';
        const newWarn = new Warn({ 
            guildId: interaction.guild.id,
            modId: interaction.member.user.id,
            userId: user.id,
            reason: reason
        });
        try {
        await newWarn.save();
        const warnEmbed = new EmbedBuilder()
        .setColor(0x5c95b5)
        .setTitle('Sucessful warning')
        .setDescription(`Warned <@${user.id}> for **${reason}**`)
        .setTimestamp()    
        await interaction.reply({ embeds: [warnEmbed]});
    } catch (error) {
        await interaction.reply(error.message);
        console.warn(`Text command failed.`)
    }
    }
		console.log('warn command - completed')
	},
};