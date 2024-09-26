const { smd } = require("../lib");

// Command to send a greeting message
smd(
  {
    pattern: "hi", // Command trigger
    react: "👋", // Reaction emoji for the command
    desc: "Greet and introduce the bot", // Description of the command
    category: "greeting", // Category under which the command falls
    filename: __filename, // The current file's name
  },
  async (message) => {
    const response = "Hey I'm Queen Nikka, a multipurpose bot developed by Haki to suit your WhatsApp needs , please type ,menu to see the bot menu, made with love by Haki, thank you.";
    
    await message.reply(response); // Send the complete message at once
  }
);

// more coming soon
