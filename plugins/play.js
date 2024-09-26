const {
  smd,
  fetchJson,
  astroJson,
  fancytext,
  yt,
  getBuffer,
  smdBuffer,
  prefix,
  Config,
} = require("../lib");
const { search, download } = require("aptoide-scraper");
const googleTTS = require("google-tts-api");
const yts = require("secktor-pack");
const fetch = require("node-fetch");
var videotime = 2000;
const { cmd } = require("../lib/plugins");
const axios = require('axios'); // Ensure axios is required
const fs = require('fs'); // Required for saving temporary audio files
const path = require('path'); // To manage file paths

smd({
  pattern: "play",
  alias: ["music"],
  react: "🎶",
  desc: "Downloads audio from YouTube.",
  category: "downloader",
  filename: __filename,
  use: "<search text>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Give Me a Search Query_*");
    }
    
    // Search for the song on YouTube
    let _0x3b2ca6 = await yts(_0x4ec99f);
    let _0x4123ae = _0x3b2ca6.all[0]; // First search result
    
    if (!_0x4123ae) {
      return await _0x2c2023.reply("*_No results found for your search_*");
    }
    
    // Send search result details to the user
    let _0x3885cc = await smdBuffer(_0x4123ae.thumbnail);
    await _0x2c2023.bot.sendMessage(_0x2c2023.jid, {
      image: _0x3885cc,
      caption: `
*Queen_Nikka • SONG DOWNLOADER🍀*

*Title :* ${_0x4123ae.title}
*Url :* ${_0x4123ae.url}
*Description :* ${_0x4123ae.timestamp}
*Views :* ${_0x4123ae.views}
*Uploaded :* ${_0x4123ae.ago}
*Author :* ${_0x4123ae.author.name}

_pleaze wait..._
`
    });
    
    // Download the audio using the API
    const apiUrl = `https://api-gifted-tech.onrender.com/docs/`;
    
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        console.log("API Response:", data); // Log the API response for debugging
        
        if (data.success && data.url) {
          const mediaUrl = data.url; // This is the signed URL you mentioned earlier
          
          // Fetch the audio file from the signed URL
          const audioResponse = await axios({
            url: mediaUrl,
            method: 'GET',
            responseType: 'stream'
          });

          // Save the audio to a temporary file
          const tempFilePath = path.join(__dirname, `${_0x4123ae.title}.mp3`);
          const writer = fs.createWriteStream(tempFilePath);

          audioResponse.data.pipe(writer);

          // Handle completion of file write
          await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
          });

          console.log(`Audio saved to ${tempFilePath}`);

          // Send the audio file to the user
          await _0x2c2023.bot.sendMessage(_0x2c2023.jid, {
            audio: { url: tempFilePath },
            fileName: `${_0x4123ae.title}.mp3`,
            mimetype: "audio/mpeg"
          }, { quoted: _0x2c2023 });

          // Optionally, delete the temporary file after sending
          fs.unlinkSync(tempFilePath);
          
          return; // Exit after successful send
        } else {
          console.log("Error: Could not download audio, API response:", data);
          await _0x2c2023.reply("*_Error: Could not download the audio. Please try again later!_*");
          return;
        }
      } catch (error) {
        console.error("Retry Error:", error); // Log retry errors
        retries--;
        if (retries === 0) {
          await _0x2c2023.reply("*_Error: Could not download the audio after multiple attempts. Please try again later!_*");
        }
      }
    }

  } catch (_0x86b411) {
    console.error("Caught Error:", _0x86b411); // Log any caught errors
    return _0x2c2023.error(_0x86b411 + "\n\ncommand: play", _0x86b411, "*_File not found!!_*");
  }
});
