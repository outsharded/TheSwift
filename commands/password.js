const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
const client = new Client({ intents: [] });
const generator = require('generate-password');

const whyEmbed = new EmbedBuilder()
	.setColor(0x20c1ed)
	.setTitle('Why do I need good passwords?')
	.setDescription('Ceating a strong and secure password can reduce the risk of cybercriminals guessing your password and accessing sensitive data. Compromised passwords caused 80% of all data breaches in 2019.\n')
	.addFields(
		{ name: '/password', value: 'Our passord generator creates passwords that would take over **3 qintillion years** for a home computer to crack.' },
	)
	.setTimestamp()
    .setFooter({ text: 'This is our generator library: https://www.npmjs.com/package/generate-password' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('password')
		.setDescription('Generate a unique, 20 character password.'),
	async execute(interaction) {
        var password = generator.generate({
            length: 20,
            numbers: true,
            symbols: true
        });
        await interaction.channel.send({ embeds: [whyEmbed] });
		await interaction.reply({ content: `**Here's your random password:\n> ${password}**`, ephemeral: true });
		console.log('Password command - completed')
},
}