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
		.setDescription('Use the OpenAI DALL-E to create images!')
		.addStringOption(option =>
			option
				.setName('prompt')
				.setDescription('Write a prompt to give to the AI. Make it short and descriptive.')
				.setRequired(true)),
	async execute(interaction) {
//		if (bannedIDs.includes(interaction.member.user.id)) {
			// If user is in list, stop the
//			await interaction.reply({ content: `You're banned from this command.`, ephemeral: true });
//		} else {
			const prompt = interaction.options.getString('prompt')
            const response = await openai.createImage({
                prompt: prompt,
                n: 1,
                size: "256x256",
            });
			await interaction.reply(`**Generated image**: ${prompt}: ${response.data.data[0].url}`)
			//log report in console
			console.warn(`${interaction.member.user.id} ${interaction.member.user.username} Input:${prompt} Output: ${completion.data.choices[0].text}`)
			console.log('Text command - completed')
//	}
	},
};

//(async () => {
//const response = await openai.createImage({
//    prompt: "a white siamese cat",
//    n: 1,
//    size: "256x256",
//  });
//  image_url = response.data.data[0].url;
//  console.log(response.data.data[0].url)
//})();