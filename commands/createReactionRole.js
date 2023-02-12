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
        let given = false
        roles.forEach(myFunction);
        
        function myFunction(value) {
            console.log(value)
            if (value.value == role.id) {
                interaction.member.edit({roles: [role]})
                let given = true
            }
          }
        if (given == true) {
            interaction.reply({ content: `You have been given ${role.name}`, ephemeral: true })
        } else {
            interaction.reply({ content: `You could not be given ${role.name}. If you belive you should be able to get this role, ask your admin to ensure it is available.`, ephemeral: true })
        }
        
       
	},
};
