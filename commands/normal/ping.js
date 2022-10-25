const Discord = require("discord.js");
const Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});

module.exports.run = async (Client, message, args, prefix) => {
  if (!message.content.startsWith(prefix)) return;

  message.channel.send(`Trouve sa raquette`).then((msg) => {
    msg.edit(`Pong!`);
  });
};

module.exports.help = {
  name: "ping",
  aliases: [],
};
