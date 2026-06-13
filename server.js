// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ma'lumotlarni saqlash uchun oddiy fayl (Database o'rniga)
const statsFile = './stats.json';

// Statistikani o'qish funksiyasi
const readStats = () => {
    if (!fs.existsSync(statsFile)) return { totalVisits: 0, daily: {}, onlineCount: 0 };
    return JSON.parse(fs.readFileSync(statsFile));
};

// Statistikani yozish funksiyasi
const writeStats = (data) => {
    fs.writeFileSync(statsFile, JSON.stringify(data, null, 2));
};

// 1. Yangi tashrifni hisoblash API
app.get('/api/visit', (req, res) => {
    let stats = readStats();
    stats.totalVisits += 1;

    const today = new Date().toLocaleDateString('en-CA');
    stats.daily[today] = (stats.daily[today] || 0) + 1;

    writeStats(stats);
    res.json({ success: true, total: stats.totalVisits });
});

// 2. Admin uchun ma'lumotlarni olish API
app.get('/api/admin/stats', (req, res) => {
    res.json(readStats());
});

app.listen(PORT, () => {
    console.log(`Backend server ishlayapti: http://localhost:${PORT}`);
});
