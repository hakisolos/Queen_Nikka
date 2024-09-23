const { smd } = require("../lib"); // Ensure this path is correct

smd(
  {
    pattern: "antibug", // Command trigger
    react: "🛡️", // Reaction when the command is run
    desc: "Send 'Antibug detected' message and block the user", // Command description
    category: "security", // Command category
    filename: __filename, // Filename reference
  },
  async (message, client) => {
    try {
      // Check if a user is mentioned
      const targetUser = message.mentionedJidList.length > 0 ? message.mentionedJidList[0] : null;

      if (!targetUser) {
        await message.reply("Please mention a user to apply the antibug.");
        return;
      }

      console.log(`Antibug action against user: ${targetUser}`);

      // Send "Antibug detected" message twice
      for (let i = 0; i < 2; i++) {
        await client.sendMessage(targetUser, { text: "Antibug detected" });
      }

      // Block the user
      await client.blockUser(targetUser);
      await message.reply(`User ${targetUser} has been warned twice and blocked.`);

      // Clear chat if needed (optional)
      // Uncomment the next line if you want to clear the chat after blocking
      // await client.clearChat(message.chat);

    } catch (error) {
      console.error("Error in antibug command:", error);
      await message.reply(`An error occurred: ${error.message}`);
    }
  }
);
