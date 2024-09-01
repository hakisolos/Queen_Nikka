const fs = require('fs');
const path = require('path');

// Import smd from the ../lib directory
const { smd } = require('../lib');

// Correct path to the config.js file based on the repo structure
const configPath = path.join(__dirname, '../config.js');

// Load the configuration
let config = require(configPath);

// Command handler
smd({
  pattern: "status",
  desc: "Toggle Auto-Read Status On or Off",
  category: "tools",
  fromMe: true,
  filename: __filename
}, async (message, inputText, { smd: commandName }) => {
  try {
    // Fetch the current state of the AUTO_READ_STATUS variable from the config
    let currentStatus = config.AUTO_READ_STATUS;

    // Determine the new state based on the input or toggle if no input is given
    let newStatus;
    if (inputText) {
      // Check if the input is 'on' or 'off'
      newStatus = inputText.toLowerCase().trim() === 'on' ? 'true' : 'false';
    } else {
      // Toggle the value if no inputText is given
      newStatus = currentStatus === 'true' ? 'false' : 'true';
    }

    // Update the AUTO_READ_STATUS in the config object
    config.AUTO_READ_STATUS = newStatus;

    // Convert the updated config object back to a string format for saving
    const updatedConfigContent = `module.exports = ${JSON.stringify(config, null, 4)};`;

    // Write the updated config back to the config.js file
    fs.writeFile(configPath, updatedConfigContent, 'utf8', (writeError) => {
      if (writeError) {
        throw writeError;
      }

      // Notify the user of the status change
      const statusMessage = newStatus === 'true' ? "enabled" : "disabled";
      message.reply(`*Auto-Read Status has been ${statusMessage}.*`);
    });
  } catch (error) {
    // Send an error message to the user
    await message.error(`An error occurred: ${error.message}\n\nCommand: ${commandName}`, error);
  }
});