const Discord = require("discord.js");
const Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});

module.exports.run = async (Client, message, args, prefix) => {};

module.exports.help = {
  name: "kick",
  aliases: [],
};
