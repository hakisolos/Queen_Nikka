const {
  smd,
  fetchJson,
  prefix,
  Config,
} = require("../lib");
const axios = require('axios'); // Ensure axios is required
const fs = require('fs'); // Required for saving temporary video files
const path = require('path'); // To manage file paths

smd({
  pattern: "tt", // Command name
  alias: ["tiktokdl"],
  react: "🎥",
  desc: "Downloads video from a TikTok link.",
  category: "downloader",
  filename: __filename,
  use: "<TikTok video URL>"
}, async (_0x2c2023, _0x4ec99f) => {
  try {
    if (!_0x4ec99f) {
      return await _0x2c2023.reply("*_Provide a TikTok video URL_*");
    }

    const videoUrl = _0x4ec99f; // TikTok video URL

    // Call the TikTok downloader API
    const apiUrl = `https://api.giftedtechnexus.co.ke/api/download/tiktok?url=${videoUrl}&apikey=gifteddevskk`;

    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log("API Response:", data); // Log the API response for debugging

    if (data.success && data.url) {
      const videoDownloadUrl = data.url; // Extract the video URL from the 'url' response

      // Download the video file
      const videoResponse = await axios({
        url: videoDownloadUrl,
        method: 'GET',
        responseType: 'stream'
      });

      // Create a temporary file path for the video
      const tempFilePath = path.join(__dirname, `${Date.now()}.mp4`);
      const writer = fs.createWriteStream(tempFilePath);

      // Pipe the video stream to the file
      videoResponse.data.pipe(writer);

      // Handle completion of file writing
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Video saved to ${tempFilePath}`);

      // Send the video file to the user
      await _0x2c2023.bot.sendMessage(_0x2c2023.jid, {
        video: { url: tempFilePath },
        caption: 'Here is your downloaded TikTok video',
        fileName: `${Date.now()}.mp4`,
        mimetype: "video/mp4"
      }, { quoted: _0x2c2023 });

      // Optionally, delete the temporary file after sending
      fs.unlinkSync(tempFilePath);
      
    } else {
      console.log("Error: Could not retrieve the video download URL, API response:", data);
      await _0x2c2023.reply("*_Error: Could not retrieve the video download URL. Please try again later!_*");
    }
  } catch (_0x86b411) {
    console.error("Caught Error:", _0x86b411); // Log any caught errors
    return _0x2c2023.error(_0x86b411 + "\n\ncommand: ju", _0x86b411, "*_Error occurred while processing the command!!_*");
  }
});
