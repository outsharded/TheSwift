const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { OPENAI_API_KEY } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const { colour } = require("../settings.json");
const bannedIDs = [771090740851638295]

//was woman command. got dewomanised. bleeding heart liberals, ey?
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ai')
		.setDescription(`Use OpenAI's DALL-E, GPT-3 and Codex engines to generate text, images and code!`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('text')
                .setDescription('Use the AI GPT-3 to create text. (Capped at approx. 200 words)')
		        .addStringOption(option => option
				    .setName('prompt')
				    .setDescription('Write a prompt to give to the AI. Keep it short and desciptive.')
				    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('code')
                .setDescription('Use the Codex engine to create code.')
                .addStringOption(option => option
                    .setName('prompt')
                    .setDescription('Write a prompt to give to the AI. Keep it short and desciptive.')
                    .setRequired(true))),
	async execute(interaction) {
		if (bannedIDs.includes(interaction.user.id)) {
			// If user is in list, stop the
			await interaction.reply({ content: `You're banned from this command.`, ephemeral: true });
		} else {
    const prompt = interaction.options.getString('prompt')
    if (interaction.options.getSubcommand() === "text") {
		try {
            await interaction.deferReply()

        const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "system", content: "You are a discord bot, used to demonstrate what ChatGPT can do."}, {role: "user", content: prompt}],
        user: interaction.user.id,
        });
        console.log(completion)

			
            //{ embeds: [madeEmbed], fetchReply: true  })
			interaction.editReply(completion.data.choices[0].message)
			//log report in console
			console.warn(`${interaction.user.id} ${interaction.user.username} Input:${prompt} Output: ${completion.data.choices[0].message.content}`)
			console.log('Text command - completed')
		} catch (error) {
			await interaction.editReply(error.message);
			console.warn(`Text command failed. ${error}`)
		}


    	} else if (interaction.options.getSubcommand() === "code") {
                try {
                   await interaction.deferReply()
                    const completion = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [{role: "system", content: "Respond with the code to acheive the wanted purpose."}, {role: "user", content: prompt}],
                        user: interaction.user.id,
                        });
                        await interaction.editReply(completion.data.choices[0].message)
                //log report in console
                    console.warn(`${interaction.user.id} ${interaction.user.username} Input:${prompt} Output: ${completion.data.choices[0].message.content}`)
                    console.log(completion.data.choices[0].message)
                    console.log('code command - completed')
                } catch (error) {
                    interaction.reply(error.message);
                    console.warn(`Code command failed.`)
                }
        } else {
            interaction.reply("Error. Did you specify text, code or image?")
        }
    }
    	},
};

