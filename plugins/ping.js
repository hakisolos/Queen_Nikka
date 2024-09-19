const os = require("os");
const fs = require("fs");
const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  prefix,
  smd,
  commands,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const { exec } = require("child_process");
const translatte = require("translatte");

{
  pattern: "ping",
  react: "👸",
  desc: "Shows ping, runtime, owner, and an image",
  category: "misc",
  filename: __filename,
},
async (message) => {
  const owner = "Your Name"; // Replace with the owner's name
  const runtimeInfo = runtime(); // Get the runtime info
  const imageUrl = "https://imgur.com/a/JHoeGsG"; // Replace with your image link

  // Measure start time for the ping calculation
  var startTime = new Date().getTime();

  // Send initial message
  const { key } = await message.reply("*Calculating ping...*");

  // Calculate the ping time
  var endTime = new Date().getTime();
  var speed = endTime - startTime;

  // Final message with speed, runtime, owner, and image
  const finalMessage = `I am Queen Nikka. My speed is: **${speed} ms**\nOwner: ${owner}\nRuntime: ${runtimeInfo}\n![Image](${imageUrl})`;
  
  await message.send(finalMessage, { edit: key });
});
