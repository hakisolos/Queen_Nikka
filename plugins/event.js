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
const { exec } = require("child_process");

let featureStatus = {}; // This object will track the state of both welcome and goodbye for each group

// Command to turn welcome or goodbye on or off
smd(
  {
    pattern: "welcome (on|off)|goodbye (on|off)", // Command trigger for turning welcome or goodbye on or off
    desc: "Turn the welcome or goodbye feature on or off for a group", // Command description
    category: "group", // Command category
    filename: __filename, // Filename reference
  },
  async (message, match) => {
    const groupID = message.key.remoteJid; // Get the group ID
    const action = match[1]; // Get whether 'on' or 'off' was triggered
    const feature = match[0].split(" ")[0]; // Extract the feature (welcome or goodbye)

    // Initialize feature status if not already present
    if (!featureStatus[groupID]) {
      featureStatus[groupID] = { welcome: false, goodbye: false };
    }

    // Turn feature on or off
    if (feature === "welcome") {
      featureStatus[groupID].welcome = (action === "on");
      await message.reply(`*Welcome feature has been turned ${action.toUpperCase()} for this group!*`);
    } else if (feature === "goodbye") {
      featureStatus[groupID].goodbye = (action === "on");
      await message.reply(`*Goodbye feature has been turned ${action.toUpperCase()} for this group!*`);
    }
  }
);

// Function to handle new members joining the group
smd(
  {
    pattern: "", // No command trigger as it's an event-based function
    desc: "Welcomes new members to the group",
    category: "group",
    onJoin: true, // This function will trigger when a new member joins
    filename: __filename,
  },
  async (message, match, m, client) => {
    const groupID = message.key.remoteJid; // Get the group ID

    // Check if welcome is enabled for the group
    if (!featureStatus[groupID] || !featureStatus[groupID].welcome) return; // Exit if welcome is off

    const groupMetadata = await client.groupMetadata(groupID); // Fetch group metadata
    const newMemberID = message.message.extendedTextMessage.contextInfo.participant; // Get the new member's contact info
    const newMemberTag = "@" + newMemberID.split("@")[0]; // Tag the new participant

    // Get group name and description
    const groupName = groupMetadata.subject;
    const groupDescription = groupMetadata.desc || "No description available"; // Get group description or fallback if not available
    const groupTotalMembers = groupMetadata.participants.length; // Total members in the group

    // Welcome message
    const welcomeMessage = `👋 Welcome ${newMemberTag} to *${groupName}*!\n\n📜 Group Description: ${groupDescription}\n👥 Total Members: ${groupTotalMembers}\n\nFeel free to introduce yourself and enjoy your stay! 🎉`;

    // Send the welcome message, tagging the new member
    await client.sendMessage(groupID, { text: welcomeMessage, mentions: [newMemberID] });
  }
);

// Function to handle members leaving the group
smd(
  {
    pattern: "", // No command trigger as it's an event-based function
    desc: "Farewell members when they leave the group",
    category: "group",
    onLeave: true, // This function will trigger when a member leaves
    filename: __filename,
  },
  async (message, match, m, client) => {
    const groupID = message.key.remoteJid; // Get the group ID

    // Check if goodbye is enabled for the group
    if (!featureStatus[groupID] || !featureStatus[groupID].goodbye) return; // Exit if goodbye is off

    const groupMetadata = await client.groupMetadata(groupID); // Fetch group metadata
    const leavingMemberID = message.message.extendedTextMessage.contextInfo.participant; // Get the leaving member's contact info
    const leavingMemberTag = "@" + leavingMemberID.split("@")[0]; // Tag the leaving participant

    // Get group name and description
    const groupName = groupMetadata.subject;
    const groupDescription = groupMetadata.desc || "No description available"; // Get group description or fallback if not available
    const groupTotalMembers = groupMetadata.participants.length; // Total members in the group

    // Farewell message
    const farewellMessage = `👋 Farewell ${leavingMemberTag}. We're sad to see you leave *${groupName}*.\n\n📜 Group Description: ${groupDescription}\n👥 Total Members: ${groupTotalMembers}\n\nWe hope to see you again! 🌟`;

    // Send the farewell message, tagging the leaving member
    await client.sendMessage(groupID, { text: farewellMessage, mentions: [leavingMemberID] });
  }
);
