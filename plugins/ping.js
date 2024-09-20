
const os = require("os");
const fs = require("fs");
const Config = require("../config");
let { fancytext, tlang, tiny, runtime, formatp, prefix, smd, commands } = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const { exec } = require("child_process");
const translatte = require("translatte");

smd({
  pattern: "ping",
  react: "👸",
  desc: "Shows ping, runtime, owner, and an image",
  category: "misc",
  filename: __filename,
}, async (message) => {
  try {
    const owner = "https://wa.me/9112171078";
    const runtimeInfo = runtime();
    const imageUrl = "https://i.imgur.com/JHoeGsG.jpg"; // Direct image link

    const startTime = new Date().getTime();
    const { key } = await message.reply("*Calculating ping...*");
    const endTime = new Date().getTime();
    const speed = endTime - startTime;

    const finalMessage = `👸 *I am Queen Nikka.*\n\nMy speed is: **${speed} ms**\nOwner: ${owner}\nRuntime: ${runtimeInfo}`;

    await message.send({
      image: { url: imageUrl },
      caption: finalMessage,
    }, { edit: key });
  } catch (err) {
    console.error(err);
  }
});
/*


Changes:


- Replaced the image URL with a direct link (remove any URL shorteners or albums).
- Removed the `![Image](${imageUrl})` markdown and instead used the `image` property in the `send` method.
- Set the `caption` property to the `finalMessage` string.


This should send the image with the text underneath, similar to a picture sent on WhatsApp. */
