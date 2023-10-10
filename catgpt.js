import axios from "axios";

export default {
  name: "catgpt",
  author: "HuyKaiser",
  role: "member",
  cooldowns: 0,
  description: "catgpt server huykaiser",
  async execute({ api, args, event }) {
  const { threadID, messageID } = event;
  const send = (msg) => api.sendMessage(msg, threadID, messageID);
    const a = args.join(' ');
    if (!a) return send("sai r cụ");
    send('Đợi tí nha bé iu')

    try {
      const b = await axios.get(`https://chat--nvhdevz.repl.co/chat?message=${encodeURIComponent(a)}`);
      if (b.data.status === "True") {
        return kaguya.reply(b.data.message);
      } else {
        return kaguya.reply("Lỗi");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.status === "False") {
        return send("Lỗi");
      } else {
        return send(
          'Đã xảy ra lỗi khi gửi yêu cầu đến API\nLiên Hệ HuyKaiser Ngay\nFB: https://www.facebook.com/HuyKaiser.profile'
        );
      }
    }
  }
};
