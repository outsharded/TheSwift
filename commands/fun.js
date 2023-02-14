const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const { colour } = require("../settings.json");
const axios = require("axios");
const { OpenWeather } = require("../config.json");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('fun')
		.setDescription(`Let have some fun!`)
        .addSubcommand(subcommand =>
            subcommand
                .setName('cat')
                .setDescription('Get a random cat.'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('urban')
            .setDescription('Search for a word on the Urban Dictionary.')
            .addStringOption(option => 
                option
                    .setName('word')
                    .setDescription("The word to find")
                    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
            .setName('dictionary')
            .setDescription('Search for a word.')
            .addStringOption(option => 
                option
                    .setName('word')
                    .setDescription("The word to find")
                    .setRequired(true)))
            .addSubcommand(subcommand =>
                        subcommand
                        .setName('rps')
                        .setDescription('Play Rock, Paper, Scissors with the bot.')
                        .addStringOption(option =>
                            option.setName('choice')
                                .setDescription('Rock, paper or scissors?')
                                .setRequired(true)
                                .addChoices(
                                    { name: 'Rock', value: 'rock' },
                                    { name: 'Paper', value: 'paper' },
                                    { name: 'Scissors', value: 'scissors' },
                                )))         
        .addSubcommand(subcommand =>
                        subcommand
                        .setName('weather')
                        .setDescription('Get the current weather')
                        .addStringOption(option => 
                            option
                                .setName('placename')
                                .setDescription("The place to get the weather for.")
                                .setRequired(true))),
	async execute(interaction) {

    if (interaction.options.getSubcommand() === "cat") {
        const catResult = await request('https://aws.random.cat/meow');
        const { file } = await catResult.body.json();

const madeEmbed = new EmbedBuilder()
    .setColor(colour)
    .setTitle('Random Cat')
    .setImage(file)
    .setTimestamp()
//Logging and reponse			
    interaction.reply({ embeds: [madeEmbed]});
    console.log('Cat fun command - completed')
    } else if (interaction.options.getSubcommand() === "urban") {
        const term = interaction.options.getString('word');
		const query = new URLSearchParams({ term });

		const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		const { list } = await dictResult.body.json();
        if (!list.length) {
            return interaction.reply(`No results found for **${term}**.`);
        } else {
        interaction.reply(`**${term}**: ${list[0].definition}`);
        }
    } else if (interaction.options.getSubcommand() === "dictionary") {
        const term = interaction.options.getString('word');
        const options = {
            method: 'GET',
            url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
            params: {word: term},
            headers: {
              'X-RapidAPI-Key': '46920133c1msh6203286a5e66d8cp11a849jsn94e89168b008',
              'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
              if (response.data.definition == '') {
                interaction.reply({ content: 'No results found.', ephemeral: true})
              } else {
                const final = response.data.definition
                const madeEmbed = new EmbedBuilder()
                .setColor(colour)
                .setTitle(`${term}:`)
                .setDescription(final)
                .setTimestamp()
                interaction.reply({ embeds: [madeEmbed]})
          }
              
          }).catch(function (error) {
              console.error(error);
          });
    } else if (interaction.options.getSubcommand() === "weather") {
        const place = interaction.options.getString('placename');
        const options = {
            method: 'GET',
            url: `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${OpenWeather}`,
          }
          axios.request(options).then(function (response) {
            console.log(response)
            if (response.data.length == 0) {interaction.reply({ content: `We can't find ${place}.`, ephemeral: true })} else {
            const optionsCurrent = {
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&appid=${OpenWeather}&units=metric`,
              };

            axios.request(optionsCurrent).then(function (response) {
            console.log(response.data);
              const madeEmbed = new EmbedBuilder()
              .setColor(colour)
              .setTitle(`Weather in ${place}:`)
              .setImage(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`)
              .setDescription('In ' + place + ': ' + response.data.weather[0].description + '. The temperature is: ' + response.data.main.temp + '°C')
              .setTimestamp()
              interaction.reply({ embeds: [madeEmbed]})

    })
}

        })
    } else if (interaction.options.getSubcommand() === "rps") {
        const userChoice = interaction.options.getString("choice")

        // Generate a random number to determine the bot's choice
        const botChoice = Math.floor(Math.random() * 3);
    
        // Define the possible choices as an array
        const choices = ['rock', 'paper', 'scissors'];
    
        // Use the bot's random number to get its choice
        const botChoiceString = choices[botChoice];
    
        // Determine the winner
        let winner;
        if ((userChoice === 'rock' && botChoiceString === 'scissors') ||
            (userChoice === 'paper' && botChoiceString === 'rock') ||
            (userChoice === 'scissors' && botChoiceString === 'paper')) {
          winner = 'user';
        } else if (userChoice === botChoiceString) {
          winner = 'tie';
        } else {
          winner = 'bot';
        }
    
        // Send the result back to the user
        let result;
        if (winner === 'user') {
          result = `You win! Your **${userChoice}** beats my **${botChoiceString}**.`;
        } else if (winner === 'tie') {
          result = `It's a tie! We both chose **${userChoice}**.`;
        } else {
          result = `You lose! My **${botChoiceString}** beats your **${userChoice}**.`;
        }
        const rps = new EmbedBuilder()
        .setColor(colour)
        .setTitle('Rock :rock:, Paper :newspaper:, Scissors :scissors:')
        .setDescription(result)
        .setTimestamp()
        await interaction.reply({ embeds: [rps] });
        console.log('RPS command - completed')

    }
console.log('fun command - completed')
    }
    
}
    
