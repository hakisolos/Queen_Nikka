//#ENJOY
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });
global.audio = "www.youtube.com";
global.video = "www.youtube.com";
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "maxwellexcel2@gmail.com";
global.location = "Imo, Nigeria";
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://astrofx0011:astro@cluster0.lmwnxdt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
global.allowJids = process.env.ALLOW_JID || "true";
global.blockJids = process.env.BLOCK_JID || "null";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/hakisolos/Queen_Nikka";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L";
global.website = process.env.GURL || "https://whatsapp.com/channel/0029VaoLotu42DchJmXKBN3L";
global.THUMB_IMAGE = process.env.THUMB_IMAGE || process.env.IMAGE || "https://i.imgur.com/zdD9xsf.mp4";
global.devs = "2348121373516";
global.sudo = process.env.SUDO || "2349112171078";
global.owner = process.env.OWNER_NUMBER || "2349112171078";
global.style = process.env.STYLE || "3";
global.gdbye = process.env.GOODBYE || "true";
global.wlcm = process.env.WELCOME || "true";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
global.disablegroup = process.env.DISABLE_GROUPS || "false",
global.MsgsInLog = process.env.MSGS_IN_LOG || "true";
global.userImages = process.env.USER_IMAGES || "https://i.imgur.com/zdD9xsf.mp4";
global.waPresence = process.env.WAPRESENCE || "available";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "";
global.read_status = process.env.AUTO_READ_STATUS || "true";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "";
global.read_status_from = process.env.READ_STATUS_FROM || "";

global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://nikkapair.onrender.com/pair";

global.SESSION_ID =
  process.env.SESSION_ID ||
  "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBoNnJNa2NzSVFHNDVPTlpia3UxSExoUUpud3Y0VjNJUkZZQXhxSGVGMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNGZvSEMxT3hSZFNVMlJYWlA0bU44VWxWQzR4c1dRbit5YnBjSEdJMndRST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTk9GZGcyQ3NDSmhUNkllYVl2SGZTTy9YZ1Z2UFZFbi9xVklVdUVhalZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmRWhxQ2tJWVlWZHhTaUpNVjlQNGNlUDBRaFRoOXdYVnhVUUJwZFBRaUgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVNSDRzZ1BpcTN0R01sT1ZMQnU1a0ZuWnVMbjNMQ3ZSUHl0V1JJclJrRUE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZUUlQ4eEpDWTNHbmRmeUhEOEJGNkQ5akxKRG5pTUZoQ0k4L3UxbFRNMVk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0FDWS9GYTY5YSs3UzY5YlVvYVBoNnV6VmNBMlN5c0FHR0N3bkJrNlpIOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNXcrY3JYeWZMR0VucE9vNlI0NytzNFh2ZHlwQlE2TnkvU2daY3B4eUIwdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp0eU12ZGxTNENjdWZtOEV0MnBRK09ObzJZQUV6ajRuSEFNL21ydmV5bElMNDBZTkdkNkRJQWpSeXNYS09YQlZIY1RmS0JsMVEweW5YZ0JTKzFjSmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjEsImFkdlNlY3JldEtleSI6IkhZYnRHbEdMN0pTdzFLTVFGbFNsaW9aUUlUbE5iVFdRQ1E2c1I4bU9kVnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InRsNG9SVlFnU1Z1ZzhOaXRLY29obXciLCJwaG9uZUlkIjoiYzlmZjRhMjctMTFjNi00ZGI3LTg3MzQtMjZhNWJhZmNkNjI3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVWVnpMT0pSdUJwY2w5a2NRZllLREl1cldiaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwamcxY3I0c0V4K0lqNW5zT3ppN2NEMlNvTzA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUUI5UlFNWTYiLCJtZSI6eyJpZCI6IjIzNDgxMDU2NzYyMjA6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJAMWludmVzdG9yIGdva3UwMDHYutmI2YPZiCDYo9it2KjZgyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXkrODV3RUVKamkwN2NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZTRzV0l6VVVycDM1bWVCaVB2VXZiNjRUSW8zWm83dTZpS2hHS1VHYUttaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidFZEQlB5dDZXZzY1YnpuWHhkQmpTeDZSZEMwcUUvQXRrWkR0MWEwbVdsZWNDNU0yV2REcjd4N1I2ejBrd1lPM2ZaRHhpWE1BckFsZVZUMFJHR28vRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IndtYzQ4M2srME80bGxONHFNYTd5QjEweldSaElDeW5ucTVxcGxUVSsyektZWmVNWUV2dmVqZFYwUlVkcUNtYmI0cXg5TzlFcjQ3bHJEWCs1ZDBPcGhnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODEwNTY3NjIyMDozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlh1TEZpTTFGSzZkK1puZ1lqNzFMMit1RXlLTjJhTzd1b2lvUmlsQm1pcHAifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjczMjg1NTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRmxEIn0=" // session id here
module.exports = {
  menu: process.env.MENU || "2",
  HANDLERS: process.env.PREFIX || ",",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "`QUEEN_NIKKA™`",
  author: process.env.PACK_AUTHER || "KING",
  packname: process.env.PACK_NAME || "HAKI",
  botname: process.env.BOT_NAME || "QUEEN_NIKKA",
  ownername: process.env.OWNER_NAME || "HAKI",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "private",
  LANG: (process.env.THEME || "N I K K A").toUpperCase(),
};
global.rank = "updated";
global.isMongodb = true;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
