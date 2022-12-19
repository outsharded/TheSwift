const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
		.setName('text')
		.setDescription('Use the AI GPT-3 to create text. (Capped at approx. 200 words)')
		.addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Write a prompt to give to the AI. Keep it short and desciptive.')
				.setRequired(true)),
	async execute(interaction) {
//		if (bannedIDs.includes(interaction.member.user.id)) {
			// If user is in list, stop the
//			await interaction.reply({ content: `You're banned from this command.`, ephemeral: true });
//		} else {
		const prompt = interaction.options.getString('prompt')
		try {
			const completion = await openai.createCompletion({
					"model": "text-babbage-001",
					"prompt": prompt,
					"temperature": .4,
					"max_tokens": 500,
					"user": interaction.member.user.id
			})
			const madeEmbed = new EmbedBuilder()
			.setColor(0x5c95b5)
			.setTitle(`${prompt}:`)
			.setDescription(completion.data.choices[0].text)
			.setTimestamp()
			.setFooter({ text: `We use OpenAI's GPT-3 to generate text!` });
			interaction.reply({ embeds: [madeEmbed], fetchReply: true  });
			//log report in console
			console.warn(`${interaction.member.user.id} ${interaction.member.user.username} Input:${prompt} Output: ${completion.data.choices[0].text}`)
			console.log('Text command - completed')
		} catch (error) {
			await interaction.reply(error.message);
			console.warn(`Text command failed.`)
		}
//	}
	},
};

