const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var CryptoJS = require("crypto-js");
var generator = require('generate-password');
const { colour } = require("../settings.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('security')
		.setDescription(`Use the bot's security commands`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('password')
                .setDescription('Generate a unique, 20 character password.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('encrypt')
            .setDescription('Privately encrypts a string to AES with a key')
            .addStringOption(option => 
                option
                    .setName('string')
                    .setDescription("The string to encrypt")
                    .setRequired(true))
                    .addStringOption(option => 
                        option
                            .setName('key')    
                            .setDescription("What to encrypt the string with")
                            .setRequired(true)
                        ))
        .addSubcommand(subcommand =>
            subcommand
            .setName('decrypt')
            .setDescription('Privately decrypts a string to AES with a key')
            .addStringOption(option => 
                option
                    .setName('string')
                    .setDescription("The string to decrypt")
                    .setRequired(true))
            .addStringOption(option => 
                option
                    .setName('key')    
                    .setDescription("The key used to encrypt")
                    .setRequired(true)
                            )),
	async execute(interaction) {

    if (interaction.options.getSubcommand() === "password") {
    const whyEmbed = new EmbedBuilder()
            .setColor(colour)
            .setTitle('Why do I need good passwords?')
            .setDescription('Creating a strong and secure password can reduce the risk of cybercriminals guessing your password and accessing sensitive data. Compromised passwords caused 80% of all data breaches in 2019.\n')
            .addFields(
                { name: '/password', value: 'Our passord generator creates passwords that would take around **3 sextillion years** for a home computer to crack.' },
            )
            .setTimestamp()
            .setFooter({ text: 'This is our generator library: https://www.npmjs.com/package/generate-password' });
    var password = generator.generate({
                length: 20,
                numbers: true,
                symbols: true
            });
            await interaction.channel.send({ embeds: [whyEmbed] });
            await interaction.reply({ content: `**Here's your random password:\n> ${password}**`, ephemeral: true });
       
    } else if (interaction.options.getSubcommand() === "encrypt") {
        let string = interaction.options.getString("string")
        let password = interaction.options.getString("key")

        interaction.reply({ content: CryptoJS.AES.encrypt(string, password).toString(), ephemeral: true});
    } else if (interaction.options.getSubcommand() === "decrypt") {
try {
        let string = interaction.options.getString("string")
        let password = interaction.options.getString("key")

        var bytes  = CryptoJS.AES.decrypt(string, password);
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);

        interaction.reply({ content: decryptedData, ephemeral: true});
    } catch (error) {
        if (error.message == 'Malformed UTF-8 data') {
            await interaction.reply("This string was incorrectly encrypted. Please try a different string.");
        } else {
        await interaction.reply(error.message);
        }
        console.warn(`Text command failed.`)
    }
    }
    console.log('security command - completed')
}
    }
