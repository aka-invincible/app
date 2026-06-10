# 🚀 Ad-Tack

> A full-stack MERN platform connecting **Businesses, Ad-Creators, and Influencers** for seamless digital advertising collaboration.

---

## 🌐 Overview

**Ad-Tack** is a role-based collaboration platform designed to streamline how brands, creators, and influencers connect, collaborate, and grow.

It provides a unified ecosystem where:

* 🏢 Businesses can hire creators & influencers
* 🎨 Ad-Creators can showcase work & get clients
* 📢 Influencers can discover brand deals

---

## ✨ Features

### 👤 Multi-Role Architecture

* Role-based authentication (Business / Creator / Influencer)
* Personalized dashboards for each user type
* Dynamic UI rendering based on role

---

### 🔐 Authentication & Security

* JWT-based authentication
* Protected routes
* Secure API handling
* Role-based access control (RBAC)

---

### 🤝 Core Functionalities

* 🔍 Discover creators & influencers
* 📂 Portfolio showcase for creators
* 💼 Brand collaboration workflows
* 📊 Scalable API-driven interactions

---

### 🎨 Frontend Highlights

* ⚛️ Next.js (App Router)
* 🎯 Tailwind CSS (modern UI)
* 📱 Fully responsive design
* 🧩 Modular component structure

---

### ⚙️ Backend Highlights

* 🟢 Node.js + Express
* 🍃 MongoDB + Mongoose
* 🔐 JWT Authentication
* 📦 Clean MVC architecture

---

## 🏗️ Tech Stack

| Frontend     | Backend    | Database |
| ------------ | ---------- | -------- |
| Next.js      | Node.js    | MongoDB  |
| React        | Express.js | Mongoose |
| Tailwind CSS | REST APIs  |          |

---

## 📁 Project Structure

```
ad-tack/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── context/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ad-tack.git
cd ad-tack
```

---

### 2️⃣ Install Dependencies

#### Client

```bash
cd client
npm install
```

#### Server

```bash
cd ../server
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the Application

#### Start Backend

```bash
npm run dev
```

#### Start Frontend

```bash
cd client
npm run dev
```

---

## 🔄 Authentication Flow

1. User registers with a selected role
2. JWT token is generated
3. Token stored on client side
4. Protected routes validate token
5. Role-based access granted

---

## 📌 Key Highlights

* 🔥 Role-based scalable architecture
* 🔥 Clean and maintainable codebase
* 🔥 Modern UI with Tailwind
* 🔥 Separation of concerns (MVC)

---

## 🚧 Future Improvements

* 💬 Real-time chat system
* 💳 Payment gateway integration
* 🤖 AI-based creator recommendations
* 🔍 Advanced filtering & search

---

## 👨‍💻 Author

**Akash Kumar Agarwal**

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
