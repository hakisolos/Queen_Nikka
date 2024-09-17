
const util = require("util");
const fs = require("fs-extra");
const { cmd } = require("../lib/plugins");
const {
  formatp,
  TelegraPh,
  aitts,
  smd,
  prefix,
  runtime,
  Config,
  parsedJid,
  sleep,
  createUrl
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");
smd({
  pattern: "repo",
  react: "📁",
  alias: ["git", "sc", "script"],
  desc: "Sends info about repo",
  category: "general",
  filename: __filename
}, async _0x45da98 => {
  try {
    let {
      data: _0x44f98c
    } = await axios.get("https://github.com/hakisolos/Queen_Nikka");

    let _0x2a5a5c = `**Queen Nikka Repository Info**\n\n`;
    _0x2a5a5c += `**Repository Name:** ${_0x44f98c.name}\n`;
    _0x2a5a5c += `**Description:** ${_0x44f98c.description}\n`;
    _0x2a5a5c += `**Stars:** ${_0x44f98c.stargazers_count}\n`;
    _0x2a5a5c += `**Forks:** ${_0x44f98c.forks_count}\n`;
    _0x2a5a5c += `**Watchers:** ${_0x44f98c.watchers_count}\n`;
    _0x2a5a5c += `**Open Issues:** ${_0x44f98c.open_issues_count}\n`;
    _0x2a5a5c += `**License:** ${_0x44f98c.license.name}\n`;
    _0x2a5a5c += `**Repository URL:**https://github.com/hakisolos/Queen_Nikka** \n`;

    await _0x45da98.send(_0x2a5a5c);
  } catch (_0x3a5a5c) {
    await _0x45da98.error(_0x3a5a5c + "\n\ncommand: repo", _0x3a5a5c);
  }
});
