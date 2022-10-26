const Discord = require("discord.js");

module.exports.run = async (Client, message, args, prefix) => {
  if (!message.member.permissions.has("BAN_MEMBERS", "ADMINISTRATOR"))
    message.channel.send(
      "Vous n'avez pas la permission d'utiliser cette commande."
    );
  else {
    if (!message.guild) return;

    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (user) {
      const member = message.guild.members(user);

      if (member) {
        member
          .ban({
            reason: "A franchit la limite du raisonable.",
          })
          .then(() => {
            message.reply(`Le ban a fonctionné`);
          })
          .catch((err) => {
            message.reply("Je n'ai pas la permission de ban ce membre.");

            console.error(err);
          });
      } else {
        message.reply("Cette utilisateur n'est pas dans le serveur.");
      }
    } else {
      message.reply("Vous n'avez pas mentionner le membre a ban.");
    }
  }
};

module.exports.help = {
  name: `ban`,
  aliases: [],
};
