const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
module.exports.run = async (bot, message, args) => {
  const user = args.join(" ");
  if (!user || user.length <= 0) {
    let uEmbed = new Discord.RichEmbed()
      .setTitle("**ERROR**")
      .addField("Usage", "`r@github <username>`")
      .setTimestamp(moment.utc().format());
    return message.channel.send(uEmbed);
  }
  const data = await fetch(`https://api.github.com/users/${user}`).then((res) =>
    res.json()
  )
  .catch(error => {
    let dEmbed = new Discord.RichEmbed()
    .setTitle("**ERROR**")
    .setDescription(
      "Could not fetch data. Please try again or make sure the name is correctly spelled!"
    )
    .setTimestamp(moment.utc().format());
  message.channel.send(dEmbed);
  })

  
  const repos = `https://github.com/${data.login}/repositories`;
  const blog = data.blog === null ? "Not specified." : data.blog
  const embed = new Discord.RichEmbed()
    .setTitle(`${data.login === null ? "Not specified." : data.login}`)
    .setURL(`https://github.com/${data.login}`)
    .setThumbnail(data.avatar_url)
    .addField("Name", `${data.name === null ? "Not specified." : data.name}`, true)
    .addField("Bio", `${data.bio === null ? "Not specified." : data.bio}`)
    .addField(`Repositories (${data.public_repos})`, `[\`${repos}\`](${repos})`)
    .setFooter("Powered by Github API V3.")
    .addField(
      "Website",
      `[\`${blog}\`](${blog})`
    )
    .addField("Followers", data.followers, true)
    .addField("Following", data.following, true)
    .setTimestamp(moment.utc().format())
    .setColor("#000");

  message.channel.send(embed);
};

module.exports.help = {
  name: "github",
};
