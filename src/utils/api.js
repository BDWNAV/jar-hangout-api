const fetch = require("node-fetch");
const { TOKEN } = require("../config").discordInfo;

async function kickUser(guildId, userId) {
  const Discord = require("discord.js");
  const client = new Discord.Client({ intents: new Discord.Intents(32767) });

  client.on("ready", (client) => {
    console.log(null);
  });

  client.on("messageCreate", (message) => {
    const member = userId;

    member.kick(userId);
  });
}

module.exports = { kickUser };