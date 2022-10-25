const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports.run = async (Client, message, args, prefix) => {
  const embedMesssage = new EmbedBuilder()
    .setAuthor("ADT Development")
    .setTitle("Le help")
    .setDescription(
      "Bienvenue dans notre serveur. Voici toutes les commandes du bot !"
    )
    .addField({
      name: "Normal",
      value:
        "`.help` --> Pour avoir l'aide.\n `.ping` --> pong \n `.serverinfo` --> Pour avoir des informations sur le serveur. \n ",
      inline: true,
    });
  message.channel.send({ embeds: [embedMesssage] });
};

module.exports.help = {
  name: "help",
  aliases: [],
};
