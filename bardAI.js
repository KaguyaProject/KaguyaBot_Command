import axios from "axios";
export default {
  name: "bard",
  author: "HuyKaiser",
  role: "member",
  cooldowns: 0,
  description: "Bard AI",
  async execute({ api, args, event }) {
    const { threadID, messageID } = event;
    const send = (msg) => api.sendMessage(msg, threadID, messageID);
    const a = args.join(' ');
    if (!a) {
      return send(`Ghi Xàm Loz Gì Zạy Bar Ẩu Rồi Đó Bar\n[ ${global.client.config.prefix}bard + content ]`);
    }
    send("Đang Send Dữ Liệu...!")
    try {
      const b = await axios.get(`https://bard-ai.arjhilbard.repl.co/bard?ask=${encodeURIComponent(a)}`);
      send(b.data.message);
    } catch (error) {
      send("Lỗi");
    }
  }
};
