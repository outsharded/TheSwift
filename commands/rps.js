//const Discord = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

// Create a new Discord client
//const client = new Discord.Client();


module.exports = {
	data: new SlashCommandBuilder()
    .setName('rps')
	.setDescription('Rock, Paper, Scissors')
	.addStringOption(option =>
		option.setName('choice')
			.setDescription('Rock, paper or scissors?')
			.setRequired(true)
			.addChoices(
				{ name: 'Rock', value: 'rock' },
				{ name: 'Paper', value: 'paper' },
				{ name: 'Scissors', value: 'scissors' },
			)),
// Define the RPS command
async execute(interaction) {
    const userChoice = interaction.options.getString("choice")

    // Generate a random number to determine the bot's choice
    const botChoice = Math.floor(Math.random() * 3) + 1;

    // Define the possible choices as an array
    const choices = ['rock', 'paper', 'scissors'];

    // Use the bot's random number to get its choice
    const botChoiceString = choices[botChoice - 1];

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
    await interaction.reply(result);
    console.log('RPS command - completed')
  }
}

