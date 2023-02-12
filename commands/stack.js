const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require("axios");
const { SO_KEY } = require("../config.json");

// Base URL for the Stack Overflow API
const SO_API_BASE = "https://api.stackexchange.com/2.2";

// This is the function that will be called when the slash command is used
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stack')
		.setDescription('Get the top question for your issue from Stack Overflow')
		.addStringOption(option =>
			option
				.setName('query')
				.setDescription('Your query or error.')
				.setRequired(true)),
	async execute(interaction) {
    const query = interaction.options.getString('query')
    // Use axios to search for the given query on Stack Overflow
    try {
    const response = await axios.get(`${SO_API_BASE}/search/advanced`, {
      params: {
        order: "desc",
        sort: "relevance",
        q: query,
        site: "stackoverflow",
        key: SO_KEY,
      },
    });
    // Get the top result from the search
    const topResult = response.data.items[0];

    // Extract the title and link of the top result
    const title = topResult.title;
    const link = topResult.link;

    // Send remply the Discord interaction with the title and link of the top result
    await interaction.reply(`**Top result:** ${title}\n${link}`);
    console.log(`Stack command - completed`)
    } catch (error) {
      if (error.message == `Cannot read properties of undefined (reading 'title')`) {
        await interaction.reply("No results found.");
    } else {
    await interaction.reply(error.message);
    }
        console.warn(`Stack command failed.`)
    }
    console.log("Stack command completed")
},
};
