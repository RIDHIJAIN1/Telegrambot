const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const TOKEN = '7544458282:AAFVP95SnAP7yL3-vicycW0SMb-IRZ04TVo';
const WEB_APP_URL = 'https://quizzical-hermann.74-208-164-206.plesk.page';
const SERVER_URL = 'https://telegrambot-p4ab.onrender.com';

const bot = new TelegramBot(TOKEN, { webHook: true });
const app = express();
app.use(express.json());

// Webhook Handler
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start Command with Improved Button
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, "🎮 Click below to play while chatting!", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Open Game",
                    web_app: {
                        url: WEB_APP_URL,
                        // Some clients support additional parameters here
                    }
                }]
            ]
        }
    });
});

// Web App Data Handler
bot.on('web_app_data', (msg) => {
    // Handle data from your web app if needed
    const chatId = msg.chat.id;
    console.log('Web app data:', msg.web_app_data.data);
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on ${PORT}`);
    await bot.setWebHook(`${SERVER_URL}/bot${TOKEN}`);
    console.log(`✅ Webhook set to ${SERVER_URL}/bot${TOKEN}`);
});