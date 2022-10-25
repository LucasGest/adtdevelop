const Discord = require("discord.js");
const Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});
const moment = require("moment");

module.exports.run = async (Client, message, args, prefix) => {
  console.log("ok");

  if (!message.content.startsWith(prefix)) return;

  const { EmbedBuilder } = require("discord.js");
  const { name, memberCount } = message.guild;
  const members = message.guild.members.cache;
  const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString())
    .slice(0, -1);

  const embedMesssage = new EmbedBuilder()
    .setTitle(`Serverinfo de ${name}`)
    .setColor("Random")
    .setThumbnail(message.guild.iconURL())

    .addFields(
      {
        name: "Nom du serveur",
        value: `**Nom:** ${name}`,
        inline: false,
      },
      {
        name: "L'ID du serveur",
        value: `**ID:** ${message.guild.id}`,
        inline: false,
      },
      {
        name: "Les boosts",
        value: `**Boost Tier:** ${
          message.guild.premiumTier
            ? `Tier ${message.guild.premiumTier}`
            : "None"
        }`,
        inline: false,
      },
      {
        name: "Boost Level",
        value: `${message.guild.premiumSubscriptionCount || "0"}`,
        inline: false,
      },
      {
        name: "Serveur créé le :",
        value: `**Créé le:** ${moment(message.guild.createdTimestamp).format(
          "LT"
        )} ${moment(message.guild.createdTimestamp).format("LL")} ${moment(
          message.guild.createdTimestamp
        ).fromNow()}`,
        inline: false,
      }
    )
    .addFields({
      name: "**🏆🏆🏆 Les statistiques du serveur. 🏆🏆🏆**",
      value: "Ici vous trouvez les statisques de votre serveur !",
      inline: true,
    })
    .addFields(
      {
        name: "Nombre de rôle:",
        value: `**Total des roles:** ${roles.length}`,
        inline: false,
      },
      {
        name: "Nombre de membre:",
        value: `**Total des membres:** ${message.guild.memberCount}`,
        inline: false,
      },
      {
        name: "Humains",
        value: `${members.filter((member) => !member.user.bot).size}`,
        inline: false,
      },
      {
        name: "Bots",
        value: `${members.filter((member) => member.user.bot).size}`,
        inline: false,
      }
    );

  message.channel.send({ embeds: [embedMesssage] });
};

module.exports.help = {
  name: "serverinfo",
  aliases: [""],
};
