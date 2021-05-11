const Wexy = require("discord.js");
const TheLord = require("../ayar.json");
const Fozen = require("../config.json");

exports.run = async (client, message, args) => {
  const prefix = Fozen.prefix;
  const kickci = TheLord.kick_hammer;
  let kisi = message.mentions.users.first()
  if(!kisi) {
    kisi = args[0]
  } else {
    kisi = kisi.id
  }
  const sebep = args.slice(1).join(" ");
  if (message.member.roles.cache.has(kickci)) {
    if (!kisi) return message.reply("Lütfen Bir Üyeyi Etiketle Veya ID'sini Gir!");
    if (!sebep) return message.reply("Lütfen Bir Sebep Gir!"); 
    message.guild.members.cache.get(kisi).kick(kisi, {reason: sebep})
    message.react("✅") 
  } else {
     message.reply("Bu Komudu Sadece Kick Hammer Rolüne Sahip Kişiler Kullanabilir.");
  }
};
