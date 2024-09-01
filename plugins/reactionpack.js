const {
  smd,
  tlang,
  prefix,
  Config,
  sleep,
  getBuffer,
  astroJson,
  smdBuffer
} = require("../lib");

smd({
  'cmdname': "react",
  'alias': ['reaction', "waifu"],
  'category': "reaction",
  'use': "[text]",
  'info': "Searches reaction gif"
}, async (message, text) => {
  try {
    // List of valid cmdnames as API endpoints
    const validEndpoints = [
      "poke", "hug", "hold", "hifi", "bite", "blush", "punch", "pat",
      "kiss", "kill", "happy", "dance", "yeet", "wink", "slap", "bonk",
      "bully", "cringe", "cuddle"
    ];

    // Check if a valid search term is provided
    if (!text || !validEndpoints.includes(text)) {
      return message.reply("Please provide a valid search term from the following: " + validEndpoints.join(', '));
    }

    // Fetch the gif from waifu API
    const axios = require("axios");
    const response = await axios.get("https://api.waifu.pics/sfw/" + text).catch(() => {});

    // If no gif is found, reply with an error
    if (!response.data || !response.data.url) {
      return message.reply("*Could not find any gif*");
    }

    // Send the gif with a caption
    message.send(response.data.url, {
      'caption': Config.caption,
      'gifPlayback': true
    }, "amdvid", message);

  } catch (error) {
    // Log the error and notify the user
    message.error(`${error}\n\nCommand: react`, error, "*Could not find any gif*");
  }
});