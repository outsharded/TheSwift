const { SlashCommandBuilder, EmbedBuilder, GatewayIntentBits, PermissionsBitField, PermissionFlagsBits, Client, ChannelType } = require('discord.js');
const fs = require("fs");
const mongoose = require('mongoose');
const Setting = require('../models/SettingsSchema');
const { colour } = require("../settings.json");
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/warns', { useNewUrlParser: true, useUnifiedTopology: true, })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('settings')
		.setDescription('Change the settings for the bot.')
.addSubcommandGroup(subcommand =>
            subcommand
                .setName('warn_dm')
                .setDescription('Settings related to users being dmed after being warned.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('warning_dm')
                .setDescription('wether to send user a DM after thye have been warned.')
                .addBooleanOption(option =>
                    option
                        .setName('dm')
                        .setDescription('true to send DM (default), false to not send.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('warning_dm_level')
                .setDescription('What information showuld be given to the user in DM')
                .addIntegerOption(option =>
                    option
                        .setName('dm_level')
                        .setDescription('Level of information given to user.')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Server', value: 1 },
                            { name: 'Server and Reason', value: 2 },
                            { name: 'Server, Reason and Moderator (default)', value: 3 },
                        ))))
.addSubcommandGroup(subcommand =>
                                subcommand
                                    .setName('roles')
                                    .setDescription('Settings related to users being able to get roles.')
                        .addSubcommand(subcommand =>
                            subcommand
                                .setName('user_role')
                                .setDescription('A role that any user can get via /role')
                                .addRoleOption(option =>
                                    option
                                        .setName('user_role')
                                        .setDescription('A role that anyone can get.')
                                        .setRequired(true)))
                                        .addSubcommand(subcommand =>
                                            subcommand
                                                .setName('rmv_user_role')
                                                .setDescription('Remove roles that any user can get via /role')
                                                .addRoleOption(option =>
                                                    option
                                                        .setName('user_role')
                                                        .setDescription('Role to remove.')
                                                        .setRequired(true))))
.addSubcommandGroup(subcommand =>
                                                            subcommand
                                                                .setName('links')
                                                                .setDescription('Voting links for this server.')
                                                    .addSubcommand(subcommand =>
                                                        subcommand
                                                            .setName('link')
                                                            .setDescription('Add a voting link')
                                                            .addStringOption(option =>
                                                                option
                                                                    .setName('link')
                                                                    .setDescription('Use a fully formed URL e.g. (https://tec-kids.co.uk)')
                                                                    .setRequired(true)))
                                                                .addSubcommand(subcommand =>
                                                                        subcommand
                                                                            .setName('rmv_link')
                                                                            .setDescription('Remove a voting link')
                                                                            .addStringOption(option =>
                                                                                option
                                                                                    .setName('link')
                                                                                    .setDescription('Use a fully formed URL e.g. (https://tec-kids.co.uk)')
                                                                                    .setRequired(true))))
.addSubcommandGroup(subcommand =>
                                                                                        subcommand
                                                                                            .setName('report')
                                                                                            .setDescription('Settings related to users being dmed after being warned.')
                                                                                    .addSubcommand(subcommand =>
                                                                                        subcommand
                                                                                            .setName('report_channel')
                                                                                            .setDescription('Channel to send reports to.')
                                                                                            .addChannelOption(option =>
                                                                                                option
                                                                                                    .setName('channel')
                                                                                                    .setDescription('Channel to send report to.')
                                                                                                    .setRequired(true)
                                                                                                    .addChannelTypes(ChannelType.GuildText)))
                                                                                                    )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            await interaction.reply({ content: "You are not allowed to modify settings!", ephemeral: true })
        } else {
            
    try {
        if (interaction.options.getSubcommand() === "warning_dm") {
            await Setting.deleteMany({ guidldId: interaction.guild.id, type: 1 });
            const newSetting = new Setting({ 
                type: 1,
                value: interaction.options.getBoolean('dm'),
                guildId: interaction.guild.id
            });
            await newSetting.save();
            const settingEmbed = new EmbedBuilder()
                .setColor(colour)
                .setTitle('Sucessful setting')
                .setDescription(`Set warning_dm to ${interaction.options.getBoolean('dm')}`)
                .setTimestamp()
            await interaction.reply({ embeds: [settingEmbed], ephemeral: true });

        } else if (interaction.options.getSubcommand() === "warning_dm_level") {
        await Setting.deleteMany({ guidldId: interaction.guild.id, type: 2 });
        const newSetting = new Setting({ 
            type: 2,
            value: interaction.options.getInteger('dm_level'),
            guildId: interaction.guild.id
        });
        await newSetting.save();
        const settingEmbed = new EmbedBuilder()
            .setColor(colour)
            .setTitle('Sucessful setting')
            .setDescription(`Set warning_dm_level to ${interaction.options.getInteger('dm_level')}`)
            .setTimestamp()
        await interaction.reply({ embeds: [settingEmbed], ephemeral: true });



        } else if (interaction.options.getSubcommand() === "rmv_user_role") {
            const role = interaction.options.getRole('user_role')
            await Setting.deleteMany({ type: 3, guidldId: interaction.guild.id, value: role.id });
            const settingEmbed = new EmbedBuilder()
                .setColor(colour)
                .setTitle('Sucessful setting')
                .setDescription(`Removed user user role ${role.name}`)
                .setTimestamp()
            await interaction.reply({ embeds: [settingEmbed], ephemeral: true });


        } else if (interaction.options.getSubcommand() === "user_role") {
            const role = interaction.options.getRole('user_role')
            const newSetting = new Setting({ 
                type: 3,
                value: role.id,
                guildId: interaction.guild.id
            });
            await newSetting.save();
            const settingEmbed = new EmbedBuilder()
                .setColor(colour)
                .setTitle('Sucessful setting')
                .setDescription(`Added user role ${role.name}`)
                .setTimestamp()
            await interaction.reply({ embeds: [settingEmbed], ephemeral: true });

        } else if (interaction.options.getSubcommand() === "link") {
            const link = interaction.options.getString('link')
            const newSetting = new Setting({ 
                type: 4,
                value: link,
                guildId: interaction.guild.id
            });;
            await newSetting.save();
            const settingEmbed = new EmbedBuilder()
                .setColor(colour)
                .setTitle('Sucessful setting')
                .setDescription(`Added link ${link}`)
                .setTimestamp()
            await interaction.reply({ embeds: [settingEmbed], ephemeral: true });


        } else if (interaction.options.getSubcommand() === "rmv_link") {
            const link = interaction.options.getString('link')
            await Setting.deleteMany({ type: 4, guidldId: interaction.guild.id, value: link });
            const settingEmbed = new EmbedBuilder()
                .setColor(colour)
                .setTitle('Sucessful setting')
                .setDescription(`Removed link ${link}`)
                .setTimestamp()
            await interaction.reply({ embeds: [settingEmbed], ephemeral: true });

        } else if (interaction.options.getSubcommand() === "report_channel") {
            await Setting.deleteMany({ guidldId: interaction.guild.id, type: 5 });
            const channel = await interaction.options.getChannel('channel')
            const newSetting = new Setting({ 
                type: 5,
                value: channel.id,
                guildId: interaction.guild.id
            });
            await newSetting.save();
            const settingEmbed = new EmbedBuilder()
                .setColor(colour)
                .setTitle('Sucessful setting')
                .setDescription(`Set report channel to to ${interaction.options.getChannel('channel')}`)
                .setTimestamp()
            await interaction.reply({ embeds: [settingEmbed], ephemeral: true });
    
    
    
            } 
    } catch (error) {
        await interaction.reply(error.message);
        console.error(error.message)
        console.warn(`setting command failed.`)
    }
    console.log('setting command completed.')
    }
        },
		
	}

   