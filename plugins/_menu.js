function greet() {
  console.log("Hello World!");
}
greet();

const os = require('os');
const Config = require('../config');
const { fancytext, tiny, runtime, formatp, prefix } = require("../lib");
const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const astro_patch = require("../lib/plugins");

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const trendUsage = generateRandomNumber(1, 99);
const databaseInfo = generateRandomNumber(1, 499);

astro_patch.smd({
  cmdname: "menu",
  desc: "Displays the help list",
  react: '👑',
  type: 'user',
  filename: __filename
}, async (context, message) => {
  try {
    const { commands } = require("../lib");
    const os = require('os');
    const { formatp, runtime, fancytext, tiny, readmore } = require('../lib');

    const currentTime = new Date();
    const hours = currentTime.getHours();
    const currentDate = currentTime.toLocaleDateString();
    let greeting = "";

    if (hours >= 5 && hours < 12) {
      greeting = "Good morning, Your Majesty!";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good afternoon, Your Majesty!";
    } else if (hours >= 18 && hours < 22) {
      greeting = "Good evening, Your Majesty!";
    } else {
      greeting = "Good night, Your Majesty!";
    }

    const commandCategories = {};
    commands.forEach(cmd => {
      if (!cmd.dontAddCommandList && cmd.pattern) {
        if (!commandCategories[cmd.category]) {
          commandCategories[cmd.category] = [];
        }
        commandCategories[cmd.category].push(cmd.pattern);
      }
    });

    const header = "👑 *" + Config.botname + " Commands* 👑\n";
    const lineSeparator = "✧ ";
    const commandPrefix = "♛ ";
    const commandSuffix = " ♛";
    const footer = "👑 *Long live Queen Nikka!* 👑";

    let menuContent = header;
    menuContent += lineSeparator + "👉 *Owner:* " + Config.ownername + "\n";
    menuContent += lineSeparator + "👉 *Uptime:* " + runtime(process.uptime()) + "\n";
    menuContent += lineSeparator + "👉 *RAM Used:* " + formatp(os.totalmem() - os.freemem()) + "\n";
    menuContent += lineSeparator + "👉 *Date:* " + currentDate + "\n";
    menuContent += lineSeparator + "👉 *Commands:* " + commands.length + "\n";
    menuContent += lineSeparator + greeting + "\n";

    for (const category in commandCategories) {
      menuContent += commandPrefix + "*" + tiny(category) + "*" + commandSuffix + "\n";
      commandCategories[category].forEach(cmd => {
        menuContent += "✧   " + fancytext(cmd, 1) + "\n";
      });
    }

    menuContent += footer + "\n\nCrafted with ❤️ by *" + Config.botname + "*!\n©Hakim\n" + readmore;

    const response = {
      caption: menuContent,
      ephemeralExpiration: 3000
    };

    return await context.sendUi(context.chat, response, context);
  } catch (error) {
    await context.error(error + "\nCommand: menu", error);
  }
});
