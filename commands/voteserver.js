const { SlashCommandBuilder, EmbedBuilder, IntegrationExpireBehavior, PermissionsBitField, PermissionFlagsBits  } = require('discord.js');
const mongoose = require('mongoose');
const Setting = require('../models/SettingsSchema');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/warns', { useNewUrlParser: true, useUnifiedTopology: true, })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voteserver')
		.setDescription('Vote for this server'),
	async execute(interaction) {
       
        const linksGuild = await Setting.find({ type: 4, guildId: interaction.guild.id });
        let wLen = linksGuild.length;

//        if (wLen == 0) {
//        var text = "No links found";
//        } else {
        var text = " ";
        for (let i = 0; i < wLen; i++) {
          text += linksGuild[i].value + '\n';
        }
//        }
        const warnsEmbed = new EmbedBuilder()
            .setColor(0x5c95b5)
            .setTitle('Voting links for this server:')
            .setDescription(text)
            .setTimestamp()    
        await interaction.reply({ embeds: [warnsEmbed]});
   

		console.log('voteserver command - completed')
	}

}