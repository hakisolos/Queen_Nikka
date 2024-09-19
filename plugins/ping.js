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
  smd,  // Ensure smd is imported correctly
  commands,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const { exec } = require("child_process");
const translatte = require("translatte");

// Command definition for "ping"
smd(
  {
    pattern: "ping", // Command trigger
    react: "👸", // Reaction emoji
    desc: "Shows ping, runtime, owner, and an image", // Command description
    category: "misc", // Command category
    filename: __filename, // Filename reference
  },
  async (message) => {
    const owner = "https://wa.me/9112171078"; // Replace with the actual owner's name
    const runtimeInfo = runtime(); // Fetch runtime info
    const imageUrl = "https://imgur.com/a/JHoeGsG"; // Replace with your image URL

    // Measure start time for ping calculation
    const startTime = new Date().getTime();

    // Send initial message
    const { key } = await message.reply("*Calculating ping...*");

    // Calculate the ping speed
    const endTime = new Date().getTime();
    const speed = endTime - startTime;

    // Prepare final message with speed, runtime, owner, and image
    const finalMessage = `👸 *I am Queen Nikka.*\n\nMy speed is: **${speed} ms**\nOwner: ${owner}\nRuntime: ${runtimeInfo}\n![Image](${imageUrl})`;

    // Send the final message and edit the previous one
    await message.send(finalMessage, { edit: key });
  }
);
