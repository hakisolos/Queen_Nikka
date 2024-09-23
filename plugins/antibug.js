const { smd } = require("../lib");

// List of common bug patterns or symbols that cause crashes
const bugPatterns = [
  /[\u200B-\u200F]/, // Zero-width characters
  /[\uD800-\uDBFF][\uDC00-\uDFFF]/, // Surrogate pairs
  /\u202E/, // Right-to-left override character
  /[\u0E01-\u0E5B]/, // Thai characters (sometimes used for bugs)
  /\uFFFD/, // Replacement character
];

// Command definition for 'antibug'
smd(
  {
    pattern: "antibug", // Command trigger
    react: "🛡️", // Reaction when the command is run
    desc: "Protects bot from bug messages", // Command description
    category: "security", // Command category
    filename: __filename, // Filename reference
  },
  async (message, client) => {
    // Check if the message content matches any of the known bug patterns
    const content = message.text || message.body || "";
    const isBugMessage = bugPatterns.some((pattern) => pattern.test(content));

    if (isBugMessage) {
      // Respond to the sender with a warning message
      await message.reply("🚨 Bug message detected! This behavior is not allowed. 🚨");

      // Optionally: Block the sender (use with caution)
      // await client.blockUser(message.sender);

      // Log the bug attempt (you can store it somewhere)
      console.log(`Bug message detected from ${message.sender}`);
    } else {
      await message.reply("🛡️ No bugs detected! All good. 🛡️");
    }
  }
);
