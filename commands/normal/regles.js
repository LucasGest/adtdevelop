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

  const { EmbedBuilder } = require("discord.js");
  const { name } = message.guild;

  const embedMesssage = new EmbedBuilder()
    .setTitle(`Regle de ${name}`)
    .setColor("Random")
    .setThumbnail(message.guild.iconURL())
    .setDescription("Accepte");

  const buttonCreate = new Discord.ButtonBuilder()
    .setCustomId("primary")
    .setLabel("Glouglou")
    .setStyle(Discord.ButtonStyle.Primary);

  message.channel.send({ embeds: [embedMesssage] });
};

module.exports.help = {
  name: "regle",
  aliases: [],
};
