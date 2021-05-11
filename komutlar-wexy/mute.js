const Wexy = require("discord.js");
const Fozen = require("ms");
const conf = require("../config.json");
const TheLord = require("../ayar.json");

exports.run = async (bot, message, args) => {
  const muteli = TheLord.mute_rol;
  const muterol = TheLord.mute_hammer;
  let kisi = message.guild.member(
    message.mentions.users.first() || message.guild.members.cache.get(args[0])
  );
  if (!kisi) return message.reply("Lütfen Bir Üye Etiketle Veya ID'sini Gir!");

  message.guild.channels.cache.forEach(async (channel, id) => {
    await channel.createOverwrite(muteli, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false
    });
  });

  let mutezaman = args[1]
    .split("sn")
    .join("s")
    .split("dk")
    .join("m")
    .split("sa")
    .join("h")
    .split("g")
    .join("d")
  if (!mutezaman) return message.reply("Lütfen Bir Süre Belirt!");

  await kisi.roles.add(muteli);
  message.reply(`<@${kisi.id}> **${args[1]}** Boyunca Konuşamayacak!`);

  setTimeout(function() {
    kisi.roles.remove(muteli);
    message.channel.send(
      `<@${kisi.id}> Kullanıcısı **${
        args[1]
      }** Boyunca Muteli Kaldı Ve Mutesi Bitti!`
    );
  }, Fozen(mutezaman));
};
