const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const TOKEN = '7544458282:AAFVP95SnAP7yL3-vicycW0SMb-IRZ04TVo'; // Replace with your actual bot token
const WEB_APP_URL = 'https://quizzical-hermann.74-208-164-206.plesk.page'; // Your Web App URL
const SERVER_URL = 'https://telegrambot-p4ab.onrender.com'; // Your Render server URL

const bot = new TelegramBot(TOKEN, { webHook: true });
const app = express();
app.use(express.json());

// Handle Telegram Webhook Updates
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Default Route
app.get('/', (req, res) => {
    res.send("🚀 Telegram Bot is running...");
});

// Send "Play" button when a user starts the bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "▶️ Play Now", url: WEB_APP_URL }]
            ]
        }
    };

    bot.sendMessage(chatId, "🎮 Click the button below to start playing:", options);
});

// Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    
    // Set Webhook after server starts
    try {
        await bot.setWebHook(`${SERVER_URL}/bot${TOKEN}`);
        console.log(`✅ Webhook set to ${SERVER_URL}/bot${TOKEN}`);
    } catch (error) {
        console.error("❌ Failed to set webhook", error);
    }
});
