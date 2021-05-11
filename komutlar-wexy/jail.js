const Wexy = require("discord.js");
const Fozen = require("ms");
const conf = require("../config.json");
const TheLord = require("../ayar.json");

exports.run = async (bot, message, args) => {
  const jail = TheLord.jail_rol;
  const jailrol = TheLord.jail_hammer;
  const jail_log = TheLord.jail_log;
  let kisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if (!kisi) return message.reply("Lütfen Bir Üye Etiketle Veya ID'sini Gir!");

  let jailzaman = args[1]
    .split("sn")
    .join("s")
    .split("dk")
    .join("m")
    .split("sa")
    .join("h")
    .split("g")
    .join("d")
  if (!jailzaman) return message.reply("Lütfen Bir Süre Belirt!");

  await kisi.roles.add(jail);
  message.reply(`<@${kisi.id}> **${args[1]}** Boyunca Cezalı!`);

  setTimeout(function() {
    kisi.roles.remove(jail);
    message.channel.send(
      `<@${kisi.id}> Kullanıcısı **${
        args[1]
      }** Boyunca Cezalıydı Ve Cezası Bitti!`
    );
  }, Fozen(jailzaman));
};
