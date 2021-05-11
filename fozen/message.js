module.exports = (client, message) => {
  const db = require("croxydb")
  let fozen = require("../config.json")
  let prefix = fozen.prefix;
  if (message.author.bot) return;
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args);
};