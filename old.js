const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '7544458282:AAFVP95SnAP7yL3-vicycW0SMb-IRZ04TVo'; // Replace with your actual bot token
const WEB_APP_URL = 'https://codinwalk.com/';

const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Click below to open Codinwalk:", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Open Codinwalk 🚀", web_app: { url: WEB_APP_URL } }]
            ]
        }
    });
});

console.log("Bot is running...");