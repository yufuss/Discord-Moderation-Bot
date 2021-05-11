module.exports = (client) => {
const Discord = require("discord.js");
let config = require("../config.json");
	console.log("Bot Giriş Yaptı | Wexy İyi Kullanımlar Diler:)");
	client.user.setActivity(config.durum || "youtube.com/channel/UCNqq5sRaQ00K6wXShk65tZg");
}