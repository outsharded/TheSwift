const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, Client, Events, GatewayIntentBits, ModalSubmitFields} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const mongoose = require('mongoose');
const Setting = require('../models/SettingsSchema');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/warns', { useNewUrlParser: true, useUnifiedTopology: true, })

module.exports = {
	data: new SlashCommandBuilder()
		.setName('report')
		.setDescription('Report an issue.'),
	async execute(interaction) {
       
                const fields = {
                        summary: new TextInputBuilder()
                          .setCustomId(`summary`)
                          .setLabel(`Provide a summary of the issue.`)
                          .setStyle(TextInputStyle.Short)
                          .setRequired(true)
                          .setPlaceholder(`@abc did bad things`),
                        full: new TextInputBuilder()
                          .setCustomId(`full`)
                          .setLabel(`Add details to your report`)
                          .setStyle(TextInputStyle.Paragraph)
                          .setRequired(false)
                          .setPlaceholder(`@abc called me a stinky poopy pants.`)
                      }
                      
                      const modal = new ModalBuilder()
                        .setCustomId(`test_modal`)
                        .setTitle(`Report`)
                        .setComponents(
                          // Note that unlike how you might expect when sending a Message with Components,
                          // MessageActionRows for Modals **can only accept TextInputComponents** (no Buttons or
                          // SelectMenus or other Components), and each Action Row can have a maximum of just one
                          // TextInputComponent. You can have a maximum of 5 Action Rows in a Modal, so you have
                          // a maximum of 5 Text Inputs per Modal.
                          new ActionRowBuilder().setComponents(fields.summary),
                          new ActionRowBuilder().setComponents(fields.full),
                        )



        const channelId = await Setting.find({ type: 5, guildId: interaction.guild.id });
        await interaction.showModal(modal);

        const report_channel = interaction.guild.channels.cache.find(channel => channel.id === '1044305863076220970')
        await interaction.awaitModalSubmit({ time: 60_000 })
                .then(interaction => 
                
                        console.log(`${interaction.customId} was submitted!`), 
                // Get the data entered by the user
                        summary = await interaction.fields.getTextInputValue(`summary`),
                        full = await interaction.fields.getTextInputValue('full'),
                        console.log( summary, full ),
                        

                whyEmbed = new EmbedBuilder()
                .setColor(0x5c95b5)
                .setTitle(`Report from <@${interaction.user.id}>: ${summary}`)
                .setDescription(full)
                .setTimestamp(),
        
                report_channel.channel.send({ embeds: [whyEmbed] }),
  )

        console.log('report command - completed')
}

}