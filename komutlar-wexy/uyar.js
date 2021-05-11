const Wexy = require("discord.js");
const TheLord = require("../ayar.json");
const Fozen = require("croxydb");

exports.run = async (client, message, args) => {
  const uyarıcı = TheLord.warn_hammer;
  const kisi = message.mentions.users.first();
  const log_kanal = client.channels.cache.get(TheLord.warn_log);
  const sebep = args.slice(1).join(" ");
  const maxuyarı = TheLord.max_uyarı;
  const uyarı = Fozen.fetch(`uyarı.${kisi.id}`);
  if(!sebep) return message.reply("Lütfen Bir Sebep Gir!")
  if (uyarı == maxuyarı - 1) {
    message.channel.send("<@" +
      kisi +
        "> Adlı Üyenin Bununla Birlikte Toplamda " +
        maxuyarı +
        " Adet Uyarısı Olduğu İçin Sunucudan Kicklendi."
    );
message.guild.members.cache.get(kisi.id).kick(kisi.id, {reason: sebep})
    const embed = new Wexy.MessageEmbed()
      .setTitle("Bir Üye Uyarıldı!")
      .addField("Uyaran", "> `"+message.author.tag+"`")
      .addField("Uyarılan", "> <@" + kisi.id + ">")
      .addField("Toplam Uyarısı", `> ${uyarı + 1 || "1"}` )
      .addField("Uyarılma Nedeni", `> ${sebep || "Belirtilmemiş"}`)
      .setDescription("`Not:`** Kullanıcı Max Uyarı Sayısına Ulaştığı İçin Sunucudan Kicklendi**")
      .setFooter("Wexy", client.user.avatarURL())
      .setThumbnail(kisi.avatarURL())
      .setColor("RED")
      .setTimestamp()
    log_kanal.send(embed);
    Fozen.delete(`uyarı.${kisi.id}`)
  } else {
    message.react("✅")
    client.users.cache.get(kisi.id).send("Merhaba!**\n" + message.guild.name + " **İsimli Sunucuda** " + sebep + "** Sebebiyle Uyarıldın Lütfen Birdaha Yapma!");
    Fozen.add(`uyarı.${kisi.id}`, 1);
    const embed = new Wexy.MessageEmbed()
      .setTitle("Bir Üye Uyarıldı!")
      .addField("Uyaran", "> `"+message.author.tag+"`")
      .addField("Uyarılan", "> <@" + kisi.id + ">")
      .addField("Toplam Uyarısı", `> ${uyarı + 1 || "1"}` )
      .addField("Uyarılma Nedeni", `> ${sebep || "Belirtilmemiş"}`)
      .setFooter("Wexy", client.user.avatarURL())
      .setThumbnail(kisi.avatarURL())
      .setColor("RED")
      .setTimestamp()
    log_kanal.send(embed);
  }
};
