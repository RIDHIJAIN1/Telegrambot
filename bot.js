const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const TOKEN = '7544458282:AAFVP95SnAP7yL3-vicycW0SMb-IRZ04TVo';
const SERVER_URL = 'https://telegrambot-p4ab.onrender.com';
const WEB_APP_URL = `${SERVER_URL}/webapp`; // Change this URL

const bot = new TelegramBot(TOKEN, { webHook: true });
const app = express();
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Web App
app.get('/webapp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle Telegram Webhook
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Send Play Button with Web App
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, "🎮 Click below to play inside Telegram!", {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "Open Game",
                    web_app: { url: WEB_APP_URL }
                }]
            ]
        }
    });
});

// Set Webhook
const setWebhook = async () => {
    try {
        await bot.setWebHook(`${SERVER_URL}/bot${TOKEN}`);
        console.log(`✅ Webhook set to ${SERVER_URL}/bot${TOKEN}`);
    } catch (error) {
        console.error("❌ Failed to set webhook", error);
    }
};

// Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    await setWebhook();
});
