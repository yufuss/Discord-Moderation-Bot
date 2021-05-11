const Discord = require("discord.js");
const Enmap = require("enmap");
const TheLord = require("./ayar.json");
const fs = require("fs");
const express = require("express");
const app = express();
const Fozen = require("./config.json");
const port = 8080;

app.get("/", function(req, res) {
  res.send("Bot Aktif");
});

app.listen(port, function() {
  console.log("Your app running on port " + port);
});

const client = new Discord.Client();
const config = require("./config.json");
let prefix = config.prefix;
client.config = config;

fs.readdir("./fozen/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./fozen/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./komutlar-wexy/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./komutlar-wexy/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[KOMUT YÜKLENDİ] ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//--------------------KICK LOG-------------------\\
client.on("guildMemberRemove", async (member, guild) => {
  const log = TheLord.kick_log;
  const denetim = await member.guild
    .fetchAuditLogs({ type: "MEMBER_KICK" })
    .then(audit => audit.entries.first());
  const ilk = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
  const kickleyen = await member.guild.members.cache.get(denetim.executor.id);
  if(ilk.action === denetim.action) {
  const Wexy = new Discord.MessageEmbed()
    .setTitle("Bir Üye Kicklendi")
    .setColor("RED")
    .setDescription(`
    **Atan Kişi**
    > Adı: ${kickleyen}
    > ID'si: \`${kickleyen.id}\`
    
    **Atılan Kişi**
    > Adı: \`${member.user.tag}\`
    > ID'si: \`${member.id}\`
    `)
    .setTimestamp()
    .setThumbnail(member.user.avatarURL())
    .setFooter("Wexy", client.user.avatarURL())
  client.channels.cache.get(log).send(Wexy)
  }
});

//--------------------BAN LOG-------------------\\

client.on("guildBanAdd", async (guild, member) => {
  const log = TheLord.ban_log;
  const denetim = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const banlayan = await guild.members.cache.get(denetim.executor.id);
  
  const Wexy = new Discord.MessageEmbed()
    .setTitle("Bir Üye Banlandı")    
    .setColor("RED")
    .setDescription(`
    **Banlayan Kişi**
    > Adı: ${banlayan}
    > ID'si: \`${banlayan.id}\`
    
   **Banlanan Kişi**
   > Adı: \`${member.tag}\`
   > ID'si: \`${member.id}\`
   
   **Banlanma Nedeni**
   > \`${denetim.reason}\`
   
   Banlanan Kişinin Banını Açmak İstersen
   \`\`\`${Fozen.prefix}unban ${member.id}\`\`\`
    `)
    .setTimestamp()
    .setThumbnail(member.avatarURL())
    .setFooter("Wexy", client.user.avatarURL())
  client.channels.cache.get(log).send(Wexy)
});

//--------------------------------------------------------\\

client.login(process.env.token);