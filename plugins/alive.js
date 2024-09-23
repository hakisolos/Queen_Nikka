const fs = require("fs");
const Config = require("../config");
const { smd } = require("../lib");

// Define the runtime function (or import it if it's from another file)
function runtime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

// Command definition for 'alive'
smd(
  {
    pattern: "alive", // Command trigger
    react: "👸", // Reaction when the command is run
    desc: "Check bot's status, speed, and latency with channel link", // Command description
    category: "misc", // Command category
    filename: __filename, // Filename reference
  },
  async (message, client) => {
    const start = Date.now();
    
    // Perform an action (no intermediate reply message)
    await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay to simulate a task

    const latency = Date.now() - start;
    const channelLink = "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L"; // Replace with your actual channel link

    // Final message with latency, speed, and channel link
    const finalMessage = `
👸 *Queen Nikka is Alive!*

*Latency:* ${latency}ms
*Speed:* Fast as always🚀

*Channel Link:* ${channelLink}

*LONG LIVE THE QUEEN 👸*
    `;

    // Send the final message directly (no initial message)
    await message.reply(finalMessage);
  }
);

// About command 'abbt'
smd(
  {
    pattern: "about", // Command trigger
    react: "👇", // Reaction when the command is run
    desc: "Shows if the bot is alive and displays important information", // Command description
    category: "misc", // Command category
    filename: __filename, // Filename reference
  },
  async (message) => {
    const owner = "HAKI"; // Owner name
    const repoLink = "https://github.com/hakisolos/queen_nikka"; // Repository link
    const channelLink = "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L"; // Channel link
    const whatsappGroupLink = "https://chat.whatsapp.com/CdF4bo9NLcSBP8ThD2tDko"; // WhatsApp Group link
    const uptime = runtime(process.uptime()); // Get bot uptime

    // Prepare the final message content
    const finalMessage = `
👸 'Queen Nikka MD'

*Owner:* ${owner}

*Channel:* ${channelLink}

*Repository:* ${repoLink}

*WhatsApp Group:* ${whatsappGroupLink}

*Made With Love by Haki❤️*

*Bot Uptime:* ${uptime}

*LONG LIVE THE QUEEN 👸*
`;

    // Send the final message
    await message.reply(finalMessage);
  }
);
