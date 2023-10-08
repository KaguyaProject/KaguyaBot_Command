import axios from "axios";
import { createCanvas, loadImage } from "canvas";
import fs from "fs-extra";
export default {
  name: "circle",
  author: "Kaguya Project",
  role: "member",
  cooldowns: 10,
  description: "Tạo avatar hình tròn!",
  async execute({ api, args, event }) {
    try {
      const id = Object.keys(event.mentions)[0] || event.senderID;

      const response = await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(response.data, "binary");
      const size = 200;

      const canvas = createCanvas(size, size);
      const context = canvas.getContext("2d");

      const img = await loadImage(imageBuffer);
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();
      context.drawImage(img, 0, 0, size, size);

      const resultBuffer = canvas.toBuffer();
      const path = "./cache/other/" + event.senderID + new Date().getTime() + ".png";
      fs.writeFileSync(path, resultBuffer);
      return api.sendMessage({ body: "Ảnh của bạn đây!", attachment: fs.createReadStream(path) }, event.threadID, (err, data) => {
        if (err) return;
        fs.unlinkSync(path);
      });
    } catch (err) {
      console.error(err);
    }
  },
};
