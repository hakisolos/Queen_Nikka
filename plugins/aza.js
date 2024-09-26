const smd = require ("../lib")
smd({
  pattern: "aza",
  react: "💳",  // No reaction needed
  desc: "Displays account information",
  category: "info",
  filename: __filename,
}, async (message) => {
  try {
    const azaMessage = `
￣￣￣￣￣￣￣￣￣￣￣￣￣|
        *6718656033*
         *MONIEPOINT*
        *EXCEL MAXEELL-UGIAGBE*
|＿＿＿＿＿＿＿＿＿＿＿＿＿|
                     \•◡•)/
                       \\     / 
                        ——
                        |     |
                        |_   |_
    `;

    // Use the message.send method directly for the bot to send the message
    await message.reply(azaMessage);

  } catch (err) {
    console.error("Error while sending aza message:", err);
  }
});
