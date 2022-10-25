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

  let mentionChannel = message.mentions.channels.first();
  if (!mentionChannel)
    return message.channel.send(
      "[⚠️] Il faut que vous mentionnez le channel ! [⚠️]"
    );

  let polldescription = args.slice(1).join(" ");
  if (!polldescription)
    return message.channel.send("[⚠️] Il faut ajoutez une description ! [⚠️]");

  const embedMesssage = new EmbedBuilder()
    .setTitle("Nouveau Sondage !")
    .setDescription("" + polldescription)
    .setColor("Random");

  message.channel.send({ embeds: [embedMesssage] }).then((embedMesssage) => {
    embedMesssage.react("👍");
  });
};

module.exports.help = {
  name: "poll",
  aliases: [],
};
