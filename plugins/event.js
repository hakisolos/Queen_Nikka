
const fs = require("fs");
const Config = require("../config");
let { fancytext, tlang, tiny, runtime, formatp, prefix, smd, commands } = require("../lib");
const { exec } = require("child_process");

let featureStatus = {};

smd({
  pattern: "welcome (on|off)|goodbye (on|off)",
  desc: "Turn the welcome or goodbye feature on or off for a group",
  category: "group",
  filename: __filename,
}, async (message, match) => {
  try {
    const groupID = message.key.remoteJid;
    const action = match[1];
    const feature = match[0].split(" ")[0];

    if (!featureStatus[groupID]) {
      featureStatus[groupID] = { welcome: false, goodbye: false };
    }

    if (feature === "welcome") {
      featureStatus[groupID].welcome = (action === "on");
      await message.reply(`*Welcome feature has been turned ${action.toUpperCase()} for this group!*`);
    } else if (feature === "goodbye") {
      featureStatus[groupID].goodbye = (action === "on");
      await message.reply(`*Goodbye feature has been turned ${action.toUpperCase()} for this group!*`);
    }
  } catch (error) {
    console.error(error);
  }
});

smd({
  pattern: "",
  desc: "Welcomes new members to the group",
  category: "group",
  onJoin: true,
  filename: __filename,
}, async (message, match, m, client) => {
  try {
    const groupID = message.key.remoteJid;

    if (!featureStatus[groupID] || !featureStatus[groupID].welcome) return;

    const groupMetadata = await client.groupMetadata(groupID);
    const newMemberID = message.message.extendedTextMessage.contextInfo.participant;
    const newMemberTag = "@" + newMemberID.split("@")[0];

    const groupName = groupMetadata.subject;
    const groupDescription = groupMetadata.desc || "No description available";
    const groupTotalMembers = groupMetadata.participants.length;

    const welcomeMessage = `👋 Welcome ${newMemberTag} to *${groupName}*!\n\n📜 Group Description: ${groupDescription}\n👥 Total Members: ${groupTotalMembers}\n\nFeel free to introduce yourself and enjoy your stay! 🎉`;

    await client.sendMessage(groupID, { text: welcomeMessage, mentions: [newMemberID] });
  } catch (error) {
    console.error(error);
  }
});

smd({
  pattern: "",
  desc: "Farewell members when they leave the group",
  category: "group",
  onLeave: true,
  filename: __filename,
}, async (message, match, m, client) => {
  try {
    const groupID = message.key.remoteJid;

    if (!featureStatus[groupID] || !featureStatus[groupID].goodbye) return;

    const groupMetadata = await client.groupMetadata(groupID);
    const leavingMemberID = message.message.extendedTextMessage.contextInfo.participant;
    const leavingMemberTag = "@" + leavingMemberID.split("@")[0];

    const groupName = groupMetadata.subject;
    const groupDescription = groupMetadata.desc || "No description available";
    const groupTotalMembers = groupMetadata.participants.length;

    const farewellMessage = `👋 Farewell ${leavingMemberTag}. We're sad to see you leave *${groupName}*.\n\n📜 Group Description: ${groupDescription}\n👥 Total Members: ${groupTotalMembers}\n\nWe hope to see you again! 🌟`;

    await client.sendMessage(groupID, { text: farewellMessage, mentions: [leavingMemberID] });
  } catch (error) {
    console.error(error);
  }
});
