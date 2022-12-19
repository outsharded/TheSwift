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
		.setName('image')
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
		const makingEmbed = new EmbedBuilder()
			.setColor(0x5c95b5)
				.setTitle('Generating Image')
			.setDescription(prompt)
			.setTimestamp()
    		.setFooter({ text: `We use OpenAI's DALL-E to generate images!` });      
//        const sent = 
		await interaction.reply({ embeds: [makingEmbed] });
		try {
        	const response = await openai.createImage({
            	    prompt: prompt,
                	n: 1,
                	size: "256x256",
					user: interaction.member.user.id
        	});
		const madeEmbed = new EmbedBuilder()
			.setColor(0x5c95b5)
			.setTitle('Generated Image')
			.setDescription(prompt)
			.setImage(response.data.data[0].url)
			.setTimestamp()
    		.setFooter({ text: `We use OpenAI's DALL-E to generate images!` });
//Logging and reponse			
        	console.log(response.data.data[0].url)
        	interaction.editReply({ embeds: [madeEmbed], fetchReply: true  });
			console.warn(`${interaction.member.user.id} ${interaction.member.user.username} Input:${prompt} Output: ${response.data.data[0].url}`)
			console.log('Image command - completed')
	} catch (error) {
		await interaction.editReply(error.message);
		console.warn(`Image command failed.`)
	}
//	}
	},
};
