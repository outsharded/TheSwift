const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const Setting = require('../models/SettingsSchema');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/warns', { useNewUrlParser: true, useUnifiedTopology: true, })


module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Get or remove a role.')
        .addSubcommand(subcommand =>
            subcommand
            .setName('role')
		.setDescription('Get a role.')
                .addRoleOption(option =>
                    option
                        .setName("role")
                        .setDescription("The role you want") 
                        .setRequired(true)))
        .addSubcommand(subcommand =>
                            subcommand
                        .setName('remove')
		                .setDescription('Remove a role')
                                .addRoleOption(option =>
                                    option
                                        .setName("role")
                                        .setDescription("The role you want to remove") 
                                        .setRequired(true))),
	async execute(interaction) {
        if (interaction.options.getSubcommand() === "role") {
        const role = interaction.options.getRole("role")
        const roles = await Setting.find({ type: 3, guildId: interaction.guild.id });
        try {

            let wLen = roles.length;
            
            for (let i = 0; i < wLen; i++) {
                var given = false;
                if (roles[i].value == role.id) {
                    await interaction.member.roles.add(role)
                    var given = true;
                }
        }

    if (given == true) {
         interaction.reply({ content: `You now have ${role}`, ephemeral: true })
    } else {
        interaction.reply({ content: `Your admin has not made ${role} available. If you believe you should be able to get it, please ask them to add it.`, ephemeral: true })
    }
          
        } catch (error) {
            if (error.message == 'Missing Permissions') {
            interaction.reply({ content: `I do not have the permission to give you this role. Please ask your admin to ensure I have the correct permissions.`, ephemeral: true })
        } else {
            await interaction.reply({ content: `I couldn't give you your role. I got this error: ${error.message}.`, ephemeral: true })
        }
    }
} else if (interaction.options.getSubcommand() === "remove") {
    const role = interaction.options.getRole("role")
    const roles = await Setting.find({ type: 3, guildId: interaction.guild.id });
    try {

        let wLen = roles.length;
        
        for (let i = 0; i < wLen; i++) {
            var given = false;
            if (roles[i].value == role.id) {
                await interaction.member.roles.remove(role)
                var given = true;
            }
    }

if (given == true) {
     interaction.reply({ content: `${role} has been removed.`, ephemeral: true })
} else {
    interaction.reply({ content: `Your admin has not made ${role} available. If you believe you should be able to remove it, please ask them to add it in settings.`, ephemeral: true })
}
      
    } catch (error) {
        if (error.message == 'Missing Permissions') {
        interaction.reply({ content: `I do not have the permission to remove this role. Please ask your admin to ensure I have the correct permissions.`, ephemeral: true })
    } else {
        await interaction.reply({ content: `I couldn't give you your role. I got this error: ${error.message}.`, ephemeral: true })
    }
}
}
 
  
        
	},
};
