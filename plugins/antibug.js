const events = require(lib_dir + "/plugins.js");
let {
  Config,
  TelegraPh,
  sleep,
  getBuffer,
  parsedJid,
  fancy,
  tiny,
  botpic,
  tlang
} = require(lib_dir);

if (!Array.isArray(global.renters)) {
  global.renters = [];
}
if (!Array.isArray(global.rentdisable)) {
  global.rentdisable = [];
}

let disabledperma = ["sharebot", "sharelist", "stoprent", "disableshare", "enableshare", "setsudo", "delsudo", "newvar", "delvar", "setvar", "update", "updatenow", "restart", "reboot"];
const {
  userdb,
  smd,
  fetchJson,
  sendWelcome,
  bot_,
  getTime
} = require(lib_dir);
const util = require("util");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
const exec = util.promisify(require("child_process").exec);
let db = {};

db.get = async () => {
  const _0x39ecdb = "./asta.json";
  try {
    return JSON.parse(fs.readFileSync(_0x39ecdb, "utf-8"));
  } catch (_0x12c187) {
    return {};
  }
};

db.update = async _0x19934a => {
  try {
    const _0x370f4c = "./asta.json";
    const _0x50546d = await db.get();
    const _0x456e8c = { ..._0x50546d, ..._0x19934a };
    fs.writeFileSync(_0x370f4c, JSON.stringify(_0x456e8c, null, 2), "utf-8");
    return _0x456e8c;
  } catch (_0x4e2ecd) {
    console.error("Error updating data:", _0x4e2ecd);
  }
};

// Store message timestamps for each user
const messageCount = {};
// Time limit in milliseconds (1 second)
const TIME_LIMIT = 1 * 1000; 
// Message limit (e.g., 2 messages in 1 second)
const MESSAGE_LIMIT = 2;

// Command to enable or disable the antibug feature
smd({
  pattern: "antibug",
  alias: ["pmlock"],
  fromMe: true,
  desc: "Enable or disable the antibug feature",
  category: "user"
}, async (_0x20ae95, _0x55bc30, { cmdName: _0x4ec31d }) => {
  try {
    let settings = await bot_.findOne({ id: "bot_" + _0x20ae95.user }) || await bot_.new({ id: "bot_" + _0x20ae95.user });

    if (!_0x55bc30) {
      return await _0x20ae95.send("*Antibug feature is currently *" + (settings.antibug ? "enabled" : "disabled") + "!!!*");
    }

    const action = _0x55bc30.toLowerCase().trim();

    if (action.startsWith("on") || action.startsWith("enable")) {
      if (settings.antibug) {
        return await _0x20ae95.send("*Antibug feature is already enabled!*");
      }
      await bot_.updateOne({ id: "bot_" + _0x20ae95.user }, { antibug: true });
      return await _0x20ae95.send("*Antibug feature enabled successfully!*");
    } else if (action.startsWith("off") || action.startsWith("disable")) {
      if (!settings.antibug) {
        return await _0x20ae95.send("*Antibug feature is already disabled!*");
      }
      await bot_.updateOne({ id: "bot_" + _0x20ae95.user }, { antibug: false });
      return await _0x20ae95.send("*Antibug feature disabled successfully!*");
    } else {
      return await _0x20ae95.send("*Please provide a valid instruction: on/off to enable/disable the antibug feature.*");
    }
  } catch (_0x4b83b9) {
    await _0x20ae95.error(_0x4b83b9 + "\n\nCommand: " + _0x4ec31d + " ", _0x4b83b9);
  }
});

// Event listener for messages with antibug/anti-spam logic
events.on("message", async (msg) => {
  if (msg.fromMe) return;

  const userId = msg.sender;

  // Initialize user in messageCount if they don't exist
  if (!messageCount[userId]) {
    messageCount[userId] = [];
  }

  // Get current timestamp
  const now = Date.now();

  // Add the current message timestamp to the user's message array
  messageCount[userId].push(now);

  // Remove timestamps that are older than the TIME_LIMIT
  messageCount[userId] = messageCount[userId].filter(timestamp => now - timestamp <= TIME_LIMIT);

  // Check if the number of messages in the last TIME_LIMIT exceeds the MESSAGE_LIMIT
  if (messageCount[userId].length >= MESSAGE_LIMIT) {
    const user = await userdb.findOne({ id: userId }) || await userdb.new({ id: userId });
    const botSettings = await bot_.findOne({ id: "bot_" + userId });

    if (botSettings && botSettings.antibug && user.permit !== "true") {
      await msg.block(); // Block the user
      await msg.reply(`*NIKKA Blocked the user for sending ${messageCount[userId].length} messages in a short amount of time (1 second).*`);

      // Clear the message count for the user after blocking
      delete messageCount[userId];
      return;
    }
  }
});
