const { SlashCommandBuilder } = require('discord.js');
const crypto = require('crypto');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aes')
		.setDescription('Privately encrypts a string to aes with a key')
        .addStringOption(option => 
            option
                .setName('String')
                .setDescription("The string to encrypt")
                .setRequired(true)
                .addStringOption(option => 
                    option
                        .setName('Key')    
                        .setDescription("What to encrypt the string with")
                        .setRequired(true)
                    )
                ),
	async execute(interaction) {
        let iv = new Buffer.from('');
        let algorithm = 'aes-256-ecb';
        let string = interaction.options.getString("String")
        let password = interaction.options.getString("Key")

        function encrypt(buffer){
            var cipher = crypto.createCipheriv(algorithm,new Buffer.from(password),iv)
            var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
            return crypted;
        }
        interaction.reply({ content: encrypt(new buffer.from(string)).toString(), ephemeral: true});
		console.log('aes command - completed')
	},
};
s