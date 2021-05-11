const dc = require("discord.js")
exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("ADMİNİSTRATOR")) return;
  message.channel.clone().then(x => { x.setPosition(message.channel.position)
message.channel.delete()
    const embed = new dc.MessageEmbed()
    .setTitle("Bu Kanal Nukelandı!")
    .setColor("RED")
    .setImage("https://cdn.discordapp.com/attachments/779937117300195338/779937292528910347/unnamed.gif")
    x.send(embed)
    })
  };
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ["nuke"],
  permLevel: 0
}
exports.help = {
  name: "nuke"
  }