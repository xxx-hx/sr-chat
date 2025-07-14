# 📡 Showroom Fanroom API

API server berbasis Node.js/Express untuk berinteraksi dengan Showroom Fanroom (live streaming platform).
Disiapkan untuk dijalankan secara serverless di Vercel.

A Node.js/Express-based API server to interact with Showroom Fanroom (live streaming platform).
Ready to be deployed serverlessly on Vercel.

---

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

**Query params:**

* `room_id` (required)
* `last_chat_id` (required)

**Response example:**

```json
[
  {
    "chat_id": 12345678,
    "username": "******",
    "date": ********,
    "message": "**********",
    "avatar": "https://static.showroom-live.com/image/avatar",
    "user_id": ********
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
  "share_url": "******",
  "has_talk_image": 0,
  "community_description": "******",
  "room_url_key": "******",
  "room_status": 1,
  "image_m": "******",
  "is_owner": 0,
  "talk_name": "******",
  "room_image_file_type": "jpeg",
  "is_live": 0,
  "room_updated_at": ******,
  "room_name": "******",
  "talk_image_file_type": "",
  "bcsvr_port": ******,
  "online_time": "******",
  "organizer_id": ******,
  "can_delete": 0,
  "image_l": "******",
  "image_s": "******",
  "is_fan": 0,
  "image_origin": "******",
  "cover_image_file_type": "jpeg",
  "online_status": 0,
  "updated_at": ******,
  "bcsvr_host": "******",
  "room_id": "******",
  "bcsvr_key": "******",
  "share_text": "******"
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
