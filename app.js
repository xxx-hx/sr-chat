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
  let room_id = req.query.room_id || req.body.room_id;
  let last_chat_id = req.query.last_chat_id || req.body.last_chat_id;

  if (!room_id || !last_chat_id) {
    return res.status(400).json({ error: 'room_id dan last_chat_id wajib diisi di query string atau body' });
  }

  try {
    const response = await axios.get(
      `https://www.showroom-live.com/fan_room/get_talk_list?room_id=${room_id}&last_chat_id=${last_chat_id}`,
      { headers: defaultHeaders(), decompress: true }
    );

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
  let room_key = req.query.room_key || req.body.room_key;

  if (!room_key) {
    return res.status(400).json({ error: 'room_key wajib diisi di query string atau body' });
  }

  try {
    const response = await axios.get(
      `https://www.showroom-live.com/api/fan_room/${room_key}`,
      { headers: defaultHeaders(), decompress: true }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// POST Send Message
app.post('/api/send-message', async (req, res) => {
  const { msg, csrf_token, sr_id, room_id } = req.body;

  if (!msg || !csrf_token || !sr_id || !room_id) {
    return res.status(400).json({ error: 'msg, csrf_token, sr_id, dan room_id wajib diisi' });
  }

  const form = new FormData();
  form.append('msg', msg);
  form.append('csrf_token', csrf_token);
  form.append('room_id', room_id);

  try {
    const response = await axios.post(
      'https://www.showroom-live.com/fan_room/post_talk',
      form,
      {
        headers: {
          ...form.getHeaders(),
          ...postHeaders(sr_id, room_id)
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }
    );

    res.json({ success: true, result: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

// POST Delete Chat
app.post('/api/delete-chat', async (req, res) => {
  const { csrf_token, chat_id, sr_id, room_id } = req.body;

  if (!csrf_token || !chat_id || !sr_id || !room_id) {
    return res.status(400).json({ error: 'csrf_token, chat_id, sr_id, dan room_id wajib diisi' });
  }

  const form = new FormData();
  form.append('csrf_token', csrf_token);
  form.append('room_id', room_id);
  form.append('chat_id', chat_id);

  try {
    const response = await axios.post(
      'https://www.showroom-live.com/fan_room/delete',
      form,
      {
        headers: {
          ...form.getHeaders(),
          ...postHeaders(sr_id, room_id)
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }
    );

    res.json({ success: true, result: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

// Helper: Default headers untuk GET
function defaultHeaders() {
  return {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, br, zstd',
    'accept-language': 'en,id-ID;q=0.9,id;q=0.8',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/137 Safari/537.36'
  };
}

// Helper: Headers untuk POST
function postHeaders(sr_id, room_id) {
  return {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en,id-ID;q=0.9,id;q=0.8',
    'cookie': `tz=Asia%2FJakarta; f_cookie_ok=1; ${sr_id}`,
    'origin': 'https://www.showroom-live.com',
    'referer': `https://www.showroom-live.com/room/fan_club?room_id=${room_id}`,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/137 Safari/537.36'
  };
}

// Serverless handler dengan patch body-parser
const handler = serverless(app, {
  request: (req, event) => {
    if (event.body && typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch {
        req.body = {};
      }
    }
  }
});

module.exports = app;
module.exports.handler = handler;
