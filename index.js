const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Form ve URL verilerini okumak için

let eventQueue = [];

// POST istekleri için (Hem body hem query parametrelerini yakalar)
app.post('/tiktok-event', (req, res) => {
    // Eğer body boşsa query parametrelerine bak, o da boşsa boş nesne al
    const data = Object.keys(req.body).length > 0 ? req.body : req.query;
    
    console.log("Gelen TikTok Etkinliği:", data);
    
    eventQueue.push(data);
    res.status(200).send({ status: "success" });
});

// GET istekleri için (TikFinity bazen GET ile tetikleme atabilir)
app.get('/tiktok-event', (req, res) => {
    const data = req.query;
    console.log("GET ile Gelen TikTok Etkinliği:", data);
    
    eventQueue.push(data);
    res.status(200).send({ status: "success" });
});

app.get('/get-events', (req, res) => {
    const eventsToSend = [...eventQueue];
    eventQueue = []; // Kuyruğu temizle
    res.json({ events: eventsToSend });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log('Sunucu aktif! Port: ' + PORT);
});
