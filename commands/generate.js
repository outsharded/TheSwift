const { SlashCommandBuilder } = require('discord.js');
const { OPENAI_API_KEY } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
//const bannedIDs = []

//was woman command. got dewomanised. bleeding heart liberals, ey?
module.exports = {
	data: new SlashCommandBuilder()
		.setName('generate')
		.setDescription('Use the AI GPT-3 to create text. (Capped at approx. 300 characters.')
		.addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Write a prompt to give to the AI. It can aouto complet sentences or create strings based')
				.setRequired(true)),
	async execute(interaction) {
//		if (bannedIDs.includes(interaction.member.user.id)) {
			// If user is in list, stop the
//			await interaction.reply({ content: `You're banned from this command.`, ephemeral: true });
//		} else {
			const prompt = interaction.options.getString('prompt')
			const completion = await openai.createCompletion({
					"model": "text-ada-001",
					"prompt": prompt,
					"temperature": .5,
					"max_tokens": 100
			})
			await interaction.reply(`**Generated text**: ${prompt}${completion.data.choices[0].text}`)
			//log report in console
			console.warn(`${interaction.member.user.id} ${interaction.member.user.username} Input:${prompt} Output: ${completion.data.choices[0].text}`)
			console.log('Text command - completed')
//	}
	},
};

