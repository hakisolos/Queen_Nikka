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
  smd,  // Ensure smd is imported from your lib
  commands,
} = require("../lib");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const { exec } = require("child_process");
const translatte = require("translatte");

// Command definition
smd(
  {
    pattern: "alive", // Command trigger
    react: "👸", // Reaction when the command is run
    desc: "Shows if the bot is alive and displays an image", // Command description
    category: "misc", // Command category
    filename: __filename, // Filename reference
  },
  async (message) => {
    const imageUrl = "YOUR_IMAGE_LINK_HERE"; // Replace with your actual image link

    // Send initial message
    const { key } = await message.reply("*Checking if Queen Nikka is alive...*");

    // Final message with the status and image
    const finalMessage = `👸 *Queen Nikka is alive!*\n\n*LONG LIVE THE QUEEN 👸*\n![Image](${imageUrl})`;

    // Send the final message, editing the previous one
    await message.send(finalMessage, { edit: key });
  }
);
