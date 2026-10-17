const express = require('express');
const app = express();

app.use(express.json());

let eventQueue = [];

app.post('/tiktok-event', (req, res) => {
    const data = req.body;
    console.log("Yeni TikTok Etkinliği Geldi:", data);
    eventQueue.push(data);
    res.status(200).send({ status: "success" });
});

app.get('/get-events', (req, res) => {
    const eventsToSend = [...eventQueue];
    eventQueue = []; 
    res.json({ events: eventsToSend });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Sunucu aktif! Port: ' + PORT);
});