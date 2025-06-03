# 🚀 shippy-express

A scalable, production-ready backend boilerplate built with **Express.js**, featuring modular architecture and powerful integrations for rapid development and deployment.

## 🧠 Why shippy-express?

This boilerplate is designed to **ship faster**, scale easily, and provide everything you need to build SaaS, APIs, or microservices-based products. The folder structure is **feature-based**, making it intuitive and future-proof.

---

## ✨ Features

- ✅ **Authentication**

  - Cookie-based sessions using Passport.js
  - Social login support (google, facebook)
  - Redis-based session caching for performance
  - Role-based access control (RBAC)

- 🔒 **Validation & Security**

  - Schema-based request validation with Joi
  - Helmet for security headers
  - Rate limiting and input sanitization ready

- 🗃️ **Database & ORM**

  - PostgreSQL integration
  - Sequelize ORM
  - Easy model/service/controller separation

- 💳 **Payments**

  - Stripe integration for subscriptions & billing
  - Paymob integration for MENA region

- 📧 **Notifications & Email**

  - Resend email service integration
  - Queue-based job handling for async notifications
  - In-app notification model structure

- 📦 **Modular Structure**

  - Feature-based architecture (e.g. `/auth`, `/user`, `/payment`)
  - Scalable routing and controller design

- ☁️ **3rd Party Services**

  - AWS S3 for file uploads
  - Logger with Morgan with rotating-file support

- 📬 **Job Queues**

  - BullMQ-based job queues
  - For email, reminders, scheduled tasks

- 🛡️ **Production Ready**
  - `.env` config
  - Docker support (optional)
  - CI/CD friendly

---

## 📁 Project Structure (Simplified)

```
src/
├── config/              # DB, Stripe, Passport, etc.
├── controllers/         # Thin route handlers
├── features/            # Full vertical slices (auth, user, etc.)
├── jobs/                # BullMQ background tasks
├── middlewares/         # Auth, validation, error handler
├── models/              # Sequelize models
├── routes/              # Feature-level route registration
├── services/            # Business logic (Stripe, Resend, etc.)
├── utils/               # Reusable helpers
├── queue/               # Queue setup (BullMQ)
├── logs/                # Log files
├── app.js               # Express config
└── server.js            # Server entry point
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/elhalawany/shippy-express.git
cd shippy-express
npm install
cp .env.example .env
npm run dev
```

---

## ⚙️ Configuration

Create a `.env` file using the example provided:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/dbname

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

SESSION_SECRET=your_session_secret

GOOGLE_CLIENT_ID=null
GOOGLE_CLIENT_SECRET=null
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

FACEBOOK_APP_ID=null
FACEBOOK_APP_SECRET=null
FACEBOOK_CALLBACK_URL=http://localhost:5000/api/auth/facebook/callback
```

---

## 🛠️ Scripts

```bash
npm run dev       # Run in dev mode
npm run start     # Run in production
npm run migrate   # Sequelize DB migration
npm run seed      # Sequelize DB seed
```

---

## 📘 API Documentation

- Swagger or Postman collection can be added later

---

## 🧪 Testing

- Jest + Supertest setup
- Basic test structure included for endpoints

---

## 📌 Roadmap

- [ ] Add DB migrations with Sequelize
- [ ] AI-Integration (e.g. Gemini)
- [ ] Add Redis caching for frequently accessed data
- [ ] Support clustering with PM2
- [ ] Support workers for horizontal scaling
- [ ] Add Swagger UI
- [ ] Add Redis Pub/Sub for real-time features
- [ ] Add E2E testing with Supertest
- [ ] Add file uploads with AWS S3
- [ ] Add multi-language support
- [ ] GraphQL version
- [ ] ABAC (Attribute-Based Access Control) or Another version of Shippy-Express supporting ABAC

---

## 🤝 Contributing

Feel free to fork, submit issues, or open PRs to improve and extend the boilerplate!

---

## 📄 License

MIT © elhalawany

---

## 💬 Support

- Create an [Issue](https://github.com/elhalawany/shippy-express/issues) for bug reports
- Star ⭐ the repo if you find it useful
- Follow [@elhalwany](https://github.com/elhalawany) for updates
