# 📡 Showroom Fanroom API

API server berbasis Node.js/Express untuk berinteraksi dengan Showroom Fanroom (live streaming platform).
Disiapkan untuk dijalankan secara serverless di Vercel.

A Node.js/Express-based API server to interact with Showroom Fanroom (live streaming platform).
Ready to be deployed serverlessly on Vercel.

---

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

## 🚀 Features / Fitur

✅ Get chat list
✅ Get room info
✅ Send message
✅ Delete chat
✅ CORS-enabled
✅ Ready for Serverless (Vercel)

---

## 📂 API Endpoints

### `GET /api/chat-list`

Ambil daftar chat di sebuah room.

🔗 Example link: [`https://sr-chat.vercel.app/api/chat-list?room_id=510067&last_chat_id=0`](https://sr-chat.vercel.app/api/chat-list?room_id=510067&last_chat_id=0)

**Query params:**

* `room_id` (required)
* `last_chat_id` (required)

**Response example:**

```json
[
  {
    "chat_id": 85145412,
    "username": "Danish Asyahril",
    "date": 1751281882,
    "message": "kemarin oline live ga",
    "avatar": "https://static.showroom-live.com/image/avatar/5.png?v=108",
    "user_id": 9609735
  }
]
```

---

### `GET /api/room-info`

Ambil informasi detail sebuah room.

🔗 Example link: [`https://sr-chat.vercel.app/api/room-info?room_key=JKT48_OlineM`](https://sr-chat.vercel.app/api/room-info?room_key=JKT48_OlineM)

**Query params:**

* `room_key` (required)

**Response example:**

```json
{
  "share_url": "https://www.showroom-live.com/room/fan_club?room_id=510067",
  "has_talk_image": 0,
  "community_description": "Name: Oline Manuel\r\nBirthday: 3 November 2007\r\nBlood type: B\r\nZodiac signs: Scorpio\r\n\r\nTwitter: M_OlineJKT48\r\nInstagram: jkt48.oline",
  "room_url_key": "JKT48_OlineM",
  "room_status": 1,
  "image_m": "https://static.showroom-live.com/image/room/cover/f27cc7e31f0e6551324bddb0cfe6981764e160fcef0731e53af327c34f721386_m.jpeg?v=1716896701",
  "is_owner": 0,
  "talk_name": "Oline / オリヌ（JKT48）",
  "room_image_file_type": "jpeg",
  "is_live": 0,
  "room_updated_at": 1716896701,
  "room_name": "Oline / オリヌ（JKT48）",
  "talk_image_file_type": "",
  "bcsvr_port": 8080,
  "online_time": "OFFLINE",
  "organizer_id": 2994,
  "can_delete": 0,
  "image_l": "https://static.showroom-live.com/image/room/cover/f27cc7e31f0e6551324bddb0cfe6981764e160fcef0731e53af327c34f721386_l.jpeg?v=1716896701",
  "image_s": "https://static.showroom-live.com/image/room/cover/f27cc7e31f0e6551324bddb0cfe6981764e160fcef0731e53af327c34f721386_s.jpeg?v=1716896701",
  "is_fan": 0,
  "image_origin": "https://static.showroom-live.com/image/room/cover/f27cc7e31f0e6551324bddb0cfe6981764e160fcef0731e53af327c34f721386_origin.jpeg?v=1716896701",
  "cover_image_file_type": "jpeg",
  "online_status": 0,
  "updated_at": 1712207916,
  "bcsvr_host": "online.showroom-live.com",
  "room_id": "510067",
  "bcsvr_key": "fan_com_510067",
  "share_text": "Oline / オリヌ（JKT48）"
}
```

---

### `POST /api/send-message`

Kirim pesan ke fanroom.

**Body JSON:**

```json
{
  "msg": "Pesan kamu",
  "csrf_token": "CSRF token",
  "sr_id": "SR session cookie",
  "room_id": "123456"
}
```

---

### `POST /api/delete-chat`

Hapus chat dari fanroom.

**Body JSON:**

```json
{
  "csrf_token": "CSRF token",
  "chat_id": "789",
  "sr_id": "sr_id=SR session cookie",
  "room_id": "123456"
}
```

---

## 🛠️ Install & Run

### Local

```bash
git clone https://github.com/Hxxn-hx/sr-chat.git
cd sr-chat
npm install
node app.js
```

Akses di: `http://localhost:3000`

---

### Deploy to Vercel

Sudah ada konfigurasi `vercel.json`, tinggal jalankan:

```bash
vercel deploy
```

---

## 👨‍💻 Tech Stack

* Node.js
* Express
* Axios
* Serverless-HTTP
* Vercel

---
