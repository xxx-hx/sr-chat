const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const https = require('https');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root - Daftar endpoint
app.get('/', (req, res) => {
  res.json({
    message: '✅ Showroom API tersedia',
    endpoints: {
      'GET /api/chat-list': 'Ambil daftar chat',
      'GET /api/room-info': 'Ambil info room',
      'POST /api/send-message': 'Kirim pesan ke fanroom',
      'POST /api/delete-chat': 'Hapus chat dari fanroom'
    }
  });
});

// GET Chat List
app.get('/api/chat-list', async (req, res) => {
    try {
        const response = await axios.get('https://www.showroom-live.com/fan_room/get_talk_list?room_id=532815&last_chat_id=0', {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,ms;q=0.6',
                'cache-control': 'max-age=0',
                'priority': 'u=0, i',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'cross-site',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            },
            decompress: true,
        });

        const mappedChats = response.data.map(chat => ({
            chat_id: chat.id,
            username: chat.n,
            date: chat.ts,
            message: chat.s,
            avatar: chat.i,
            user_id: chat.u
        }));

        res.json(mappedChats);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// GET Room Info
app.get('/api/room-info', async (req, res) => {
    try {
        const response = await axios.get('https://www.showroom-live.com/api/fan_room/d2e834751328', {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,ms;q=0.6',
                'cache-control': 'max-age=0',
                'priority': 'u=0, i',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            },
            decompress: true,
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// POST Send Message
app.post('/api/send-message', async (req, res) => {
    const { msg, csrf_token, sr_id } = req.body;
    if (!msg || !csrf_token || !sr_id) {
        return res.status(400).json({ error: 'msg, csrf_token, dan sr_id wajib diisi' });
    }

    const form = new FormData();
    form.append('msg', msg);
    form.append('csrf_token', csrf_token);
    form.append('room_id', '532815');

    try {
        const response = await axios.post('https://www.showroom-live.com/fan_room/post_talk', form, {
            headers: {
                ...form.getHeaders(),
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en,id-ID;q=0.9,id;q=0.8,en-US;q=0.7,ms;q=0.6',
                'cookie': `tz=Asia%2FJakarta; f_cookie_ok=1; ${sr_id}`,
                'origin': 'https://www.showroom-live.com',
                'priority': 'u=1, i',
                'referer': 'https://www.showroom-live.com/room/fan_club?room_id=532815',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        res.json({ success: true, result: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

// POST Delete Chat
app.post('/api/delete-chat', async (req, res) => {
    const { csrf_token, chat_id, sr_id } = req.body;
    if (!csrf_token || !chat_id || !sr_id) {
        return res.status(400).json({ error: 'csrf_token, chat_id, dan sr_id wajib diisi' });
    }

    const form = new FormData();
    form.append('csrf_token', csrf_token);
    form.append('room_id', '532815');
    form.append('chat_id', chat_id);

    try {
        const response = await axios.post('https://www.showroom-live.com/fan_room/delete', form, {
            headers: {
                ...form.getHeaders(),
                'accept': 'application/json, text/plain, */*',
                'accept-encoding': 'gzip, deflate, br, zstd',
                'accept-language': 'en-US,en;q=0.9,id;q=0.8',
                'cookie': `tz=Asia%2FJakarta; f_cookie_ok=1; ${sr_id}`,
                'origin': 'https://www.showroom-live.com',
                'priority': 'u=1, i',
                'referer': 'https://www.showroom-live.com/room/fan_club?room_id=532815',
                'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36'
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        res.json({ success: true, result: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.response?.data || error.message });
    }
});

// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);
