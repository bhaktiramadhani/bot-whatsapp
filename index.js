const qrcode = require("qrcode-terminal");
const {Client, LocalAuth, MessageMedia} = require("whatsapp-web.js");
const {getTime} = require("./utils");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, {small: true});
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  const contact = await message.getContact();
  const messageReply = message._data.quotedMsg;
  // if (message.hasQuotedMsg && messageReply.type === "image") {
  //   const data = new MessageMedia(messageReply.mimetype, messageReply.body)
  //   client.sendMessage(
  //     message.from,
  //     data,
  //     {
  //       sendMediaAsSticker: true,
  //       stickerAuthor: "san bot +62895362555775",
  //     }
  //   );
  // }
  // const media = await message.downloadMedia();
  // const data = new MessageMedia(media.mimetype, media.data);

  if (message.body === ".s" && !message.from.includes("g")) {
    if (message.hasMedia) {
      console.log("membuat stiker...\n");
      message.reply("hadangi cok...");
      const media = await message.downloadMedia();
      const data = new MessageMedia(media.mimetype, media.data);
      client.sendMessage(message.from, data, {
        sendMediaAsSticker: true,
        stickerAuthor: "san bot 0895362555775",
      });
      console.log({
        name: contact.pushname,
        from: message.from,
        number: contact.id.user,
        time: getTime(message.timestamp),
      });
    } else {
      message.reply("kirim gambarnya co\ncaptionnya: .s");
    }
  } else {
    // dikirim ketika user mengetik apa saja selain .s membuat stiker
    client.sendMessage(message.from, "apaan coy");
  }

  // const mentions = await message.getMentions();
  // mentions.map((mention) => {
  //   if (mention.id._serialized === "62895362555775@c.us") {
  //     message.reply("apa njing?");
  //   }
  // });
});
