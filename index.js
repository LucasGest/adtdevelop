const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessageReactions,
  ],
});
const dotenv = require("dotenv");
dotenv.config();

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
// Commands Handler

fs.readdirSync("./commands/").forEach((dir) => {
  fs.readdir(`./commands/${dir}`, (err, files) => {
    if (err) throw err;

    var jsFiles = files.filter((f) => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
      console.log("Can't find any commands!");
      return;
    }

    jsFiles.forEach((file) => {
      var fileGet = require(`./commands/${dir}/${file}`);
      console.log(`[HANDLER] : Le fichier ${file} a été chargé.`);
      try {
        Client.commands.set(fileGet.help.name, fileGet);

        fileGet.help.aliases.forEach((alias) => {
          Client.aliases.set(alias, fileGet.help.name);
        });
      } catch (err) {
        return console.log(err);
      }
    });
  });
});

Client.once("ready", () => {
  console.log(Client.user.username + " est prêt. Version 1.0");
  Client.user.setActivity("Blblblbl", {
    type: "PLAYING",
  });
});

// Lors de la création d'un message

Client.on("messageCreate", (message) => {
  if (message.author.Client || message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commands =
    Client.commands.get(cmd.slice(process.env.prefix.length)) ||
    Client.commands.get(
      Client.aliases.get(cmd.slice(process.env.prefix.length))
    );

  if (commands) commands.run(Client, message, args, process.env.prefix);
});

Client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "button") {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("primary")
        .setLabel("Click me!")
        .setStyle(ButtonStyle.Primary)
    );

    await interaction.reply({
      content: "I think you should,",
      components: [row],
    });
  }
});

// Auto role

Client.on("guildMemberAdd", (member) => {
  const embedMesssage = new EmbedBuilder()
    .setTitle(`Bienvenue ${member.user.username}`)
    .setImage(member.user.avatarURL())
    .setDescription(
      `Tu as rejoint le serveur ADT Development. Grâce à toi, nous sommes ${Client.guilds.cache.reduce(
        (a, g) => a + g.memberCount,
        0
      )}`
    )
    .addFields({
      name: "Importants",
      value: `Pourriez vous aller choisir vos rôles dans le channel spécifique.`,
      inline: false,
    })
    .setTimestamp();

  Client.channels.cache
    .get("1033036523760795738")
    .send({ embeds: [embedMesssage] });

  let roles = [
    "1033036001943244860",
    "1033034850749394976",
    "1034410165379805235",
  ];

  for (let i = 0; i < roles.length; i++) {
    member.roles.add(roles[i]);
  }
});

Client.login(process.env.TOKEN);
