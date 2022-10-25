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
  const { name, memberCount } = message.guild;

  const embedMesssage = new EmbedBuilder()
    .setTitle(`Help de ${name}`)
    .setColor("Random")
    .setThumbnail(message.guild.iconURL())

    .addFields({
      name: "Normal",
      value:
        "`-help :` Affiche le help. \n `-ping :` Pong. \n `-poll :` Faire un sondage. \n `-serverinfo :` Affiche les infos du serveur.",
      inline: false,
    });

  message.channel.send({ embeds: [embedMesssage] });
};

module.exports.help = {
  name: "help",
  aliases: [],
};
