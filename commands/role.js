const { SlashCommandBuilder, EmbedBuilder, ReactionCollector,Client,GatewayIntentBits, Message, Partials } = require('discord.js');
const mongoose = require('mongoose');
const Setting = require('../models/SettingsSchema');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/warns', { useNewUrlParser: true, useUnifiedTopology: true, })


module.exports = {
	data: new SlashCommandBuilder()
		.setName('role')
		.setDescription('Get a role.')
                .addRoleOption(option =>
                    option
                        .setName("role")
                        .setDescription("The role to give them") 
                        .setRequired(true)),
	async execute(interaction) {

        const role = interaction.options.getRole("role")
        const roles = await Setting.find({ type: 3, guildId: interaction.guild.id });
        try {
            
            let wLen = roles.length;

            for (let i = 0; i < wLen; i++) {
                if (roles[i].value == role.id) {
                    interaction.member.edit({roles: [role]})
                }
            }
            return;
        


            if (interaction.member.roles.cache.has(role.id)) {
                interaction.reply({ content: `You now have ${role}`, ephemeral: true })
                } else {
                interaction.reply({ content: `I couldn't give you your role. Please ask your admin to ensure I have the correct permissions, and this role is available.`, ephemeral: true })
                }
          
       

        } catch (error) {
            await interaction.reply({ content: `I couldn't give you your role. I got this error: ${error.message}.`, ephemeral: true })
        }
  
        
	},
};
