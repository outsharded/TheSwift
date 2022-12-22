const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OPENAI_API_KEY } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//const bannedIDs = []
//commneted code is a ban system


module.exports = {
	data: new SlashCommandBuilder()
		.setName('code')
		.setDescription('Use the AI GPT-3 to create code.')
		.addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Be very clear and desciptive.')
				.setRequired(true)),
	async execute(interaction) {
//		if (bannedIDs.includes(interaction.member.user.id)) {
			// If user is in list, stop the
//			await interaction.reply({ content: `You're banned from this command.`, ephemeral: true });
//		} else {
		const prompt = interaction.options.getString('prompt')
		const makingEmbed = new EmbedBuilder()
			.setColor(0x5c95b5)
			.setTitle(`Generating: ${prompt}`)
			.setTimestamp()
    		.setFooter({ text: `We use OpenAI's Codex engine to generate code!` });      
//        const sent = 
		await interaction.reply({ embeds: [makingEmbed] });
			try {
				const completion = await openai.createCompletion({
					"model": "code-cushman-002",
					"prompt": prompt,
					"temperature": .9,
					"max_tokens": 300,
					"user": interaction.member.user.id
				})
				const madeEmbed = new EmbedBuilder()
				.setColor(0x5c95b5)
				.setTitle(`I generated: ${prompt}`)
				.setDescription(completion.data.choices[0].text)
				.setTimestamp()
				.setFooter({ text: `We use OpenAI's Codex engine to generate code!` });
				interaction.editReply({ embeds: [madeEmbed] });
			//log report in console
				console.warn(`${interaction.member.user.id} ${interaction.member.user.username} Input:${prompt} Output: ${completion.data.choices[0].text}`)
				console.log('code command - completed')
			} catch (error) {
				await interaction.editReply(error.message);
				console.warn(`Code command failed.`)
			}
//	}
	},
};

