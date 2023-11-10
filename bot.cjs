require("dotenv").config();

let TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.error("Missing token!");
  process.exit(1);
} else console.log("Token found!");


let { Client, GatewayIntentBits } = require("discord.js");
const { SlashCommandBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.MessageContent] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};

client.login(TOKEN);
