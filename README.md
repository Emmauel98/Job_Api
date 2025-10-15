# AI Job Platform API — README

A **production-ready backend** for an AI-enhanced job platform.  

This README explains everything I built, why I built it this way, how each phase was implemented, the packages used, how to run & test, and how you can adapt the folder structure and features for your own projects.

---

## 🧭 Table of Contents

1. [Overview & Goals](#1--overview--goals)  
2. [Folder Structure & Reasoning](#2--folder-structure-and-why)  
3. [Project Phases](#3--project-phases-what-was-done--why)  
4. [Key Features Explained](#4--key-features-explained-with-examples)  
5. [Important Dependencies](#5--key-dependencies--what-they-do)  
6. [.env Example](#6--envexample-sample)  
7. [Scripts & Running Locally](#7--scripts--how-to-run-locally)  
8. [Designing Your Own Folder Structure](#8--how-to-design-your-own-professional-folder-structure)  
9. [API Endpoints](#9--api-endpoints-summary)  
10. [Testing & CI/CD](#10--testing--cicd-details)  
11. [Security & Production Notes](#11--security--production-notes)  
12. [Further Reading & Learning Path](#12--further-reading--learning-path)

---

## 1 — Overview & Goals

This backend is designed to be:

- **Modular**: controllers, services, routes, and middleware are separated.  
- **Production-ready**: includes security middleware, input validation, rate limiting, and caching.  
- **Extensible**: AI provider-agnostic (OpenAI or Ollama), pluggable email provider, and swappable storage.  
- **Testable**: Jest + Supertest with in-memory MongoDB for CI-friendly testing.

### The app supports:

- User authentication with JWT + refresh tokens and Role-Based Access Control (admin, recruiter, applicant).  
- CRUD for Jobs with search, filters, and pagination.  
- Application submissions (upload resume, status updates, notifications).  
- AI features: job description generation, resume parsing/matching, interview question generation — toggleable between OpenAI (cloud) and Ollama (local).  
- Analytics endpoints for dashboards.  
- Redis caching and other production improvements.

---

## 2 — Folder Structure (and Why)

```bash
src/
  app.ts
  server.ts
  config/
    db.ts
    redis.ts
    email.ts
    cloudinary.ts
    security.ts
  controllers/
    auth.controller.ts
    job.controller.ts
    application.controller.ts
    ai.controller.ts
    analytics.controller.ts
  services/
    auth.service.ts
    job.service.ts
    application.service.ts
    email.service.ts
    ai/
      ai.provider.ts
      openai.provider.ts
      ollama.provider.ts
    analytics.service.ts
  models/
    User.ts
    JobListing.ts
    Application.ts
  routes/
    auth.routes.ts
    jobs.routes.ts
    applications.routes.ts
    ai.routes.ts
    analytics.routes.ts
  middleware/
    auth.middleware.ts
    role.middleware.ts
    validate.middleware.ts
    upload.middleware.ts
    rateLimiter.middleware.ts
    error.middleware.ts
  utils/
    response.ts
    pagination.ts
    cache.ts
  validations/
    auth.validation.ts
    job.validation.ts
    application.validation.ts
    ai.validation.ts
  types/
    express.d.ts
tests/
  setup.ts
  integration/
  unit/
.env
```

## Why This Layout?

* Separation of concerns: Clear boundary between controllers, services, and models.

* Testability: Services are isolated from Express, simplifying unit testing.

* Scalability: Easy migration into monorepo or modular structure.

* Developer clarity: Follows familiar patterns found in top open-source APIs.


You can also use a **feature-based structure** for larger teams:

```bash
src/features/jobs/
  job.model.ts
  job.controller.ts
  job.service.ts
  job.routes.ts
  job.validation.ts
```

## 3 — Project Phases (What Was Done & Why)

Each phase explains **what was implemented** and why.

### Phase 1 — Project Foundation

* Setup: Node/TypeScript project, Express app, ESLint, Prettier, Husky.

* Libraries: Express, Mongoose, dotenv-safe, cors, helmet, compression, morgan.

**Why:** Establishes a secure and maintainable baseline.

### Phase 2 — Database & Models

* MongoDB connection with graceful shutdown.

* Models: `User`, `JobListing`, `Application`.

* Indexing for performance and uniqueness.

**Why:** Mongoose enforces schema consistency and efficient relationships.

### Phase 3 — Auth & RBAC

* JWT + Refresh tokens implemented.

* Middleware for requireAuth and requireRole.

* Refresh token rotation supported.

**Why:** Secure, scalable authentication and least-privilege authorization.

### Phase 4 — Job Management

* Job CRUD with search, filters, pagination, sorting.

* RBAC: only recruiters/admins can modify jobs.

**Why:** Job management is the backbone of the platform...

### Phase 5 — Applications

* Resume upload (Multer + Cloudinary).

* Unique constraint on { job, applicant }.

* Status management (pending, shortlisted, rejected).

**Why:** Prevents duplicate applies; supports real-world job application flow.

### Phase 6 — Email Notifications

* Handlebars templates.

* Nodemailer/Resend providers.

**Why:** User engagement and professionalism.

### Phase 7 — AI Features

* Provider-agnostic (OpenAI or Ollama).

* AI generates job descriptions, parses resumes, matches candidates, and creates interview questions.

* NodeCache caching layer.

**Why:** Plug-and-play AI without provider lock-in.

### Phase 8 — Analytics

* MongoDB aggregation: total jobs, applications, top roles.

**Why:** Enables insights for recruiters/admins dashboards.

### Phase 10 — Testing & CI/CD

* Jest + Supertest + in-memory Mongo.

* GitHub Actions for CI.

* Husky pre-commit hooks.

**Why:** Reliable deployments and maintainable code.

## 4 — Key Features Explained (With Examples)

🔐 **Authentication**

* JWT access + refresh tokens.

* Role-based access (admin/recruiter/applicant).

* Refresh rotation for improved security.

💼 **Job Management**

* Flexible search and filtering.

* Pagination helper utilities.

* Role-based restrictions.

📄 **Resume Upload**

* File type and size validation.

* Upload to Cloudinary (or easily switch to S3).

🤖 **AI Resume Matching**

* Extracts PDF text, parses with AI, compares to job requirements.

* Returns skill match percentage.

⚡ **Caching**

* Redis caching for job listings.

* Cache invalidation upon job data update.

## 5 — Key Dependencies & What They Do
Category	Package	Purpose
Core	express, mongoose, typescript	Web server + database + typing
Auth	jsonwebtoken, bcryptjs	JWT + password hashing
Security	helmet, cors, express-rate-limit	API protection
Validation	joi	Schema validation
File Upload	multer, multer-storage-cloudinary, cloudinary	Resume upload
Email	nodemailer, resend	Email notifications
AI	openai, axios, pdf-parse	AI job matching & parsing
Cache	ioredis, node-cache	Redis + in-memory cache
Testing	jest, ts-jest, supertest	Unit + integration testing
Dev Tools	eslint, prettier, husky, morgan	Code quality & logging

## 6 — .env.example (Sample)

```bash
PORT=4000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/job_api
JWT_SECRET=your_jwt_secret_here
JWT_REFRESH_SECRET=your_jwt_refresh_secret_here
REDIS_URL=rediss://default:password@redis-host:6379
REDIS_TLS=true
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_USER=you@gmail.com
EMAIL_PASS=app_password
AI_PROVIDER=ollama
OPENAI_API_KEY=sk-...
OLLAMA_API_URL=http://localhost:11434
CLIENT_URL=http://localhost:3000
```

## 7 — Scripts & How to Run Locally

```bash
npm install
npm run dev   # starts dev server with ts-node/nodemon
npm run build # compiles TypeScript
npm start     # runs compiled build
npm test      # runs all tests
```

To generate JWT secrets:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

If using Ollama locally:

```bash
ollama serve
ollama run <model>

```

### 8 — How to Design Your Own Professional Folder Structure

**Key Guidelines**

1. Separate controllers, services, models, and middleware.

2. Keep modules single-purpose.

3. Abstract external providers (email, AI, storage).

4. Use central validation and error handlers.

5. Maintain typed contracts (req.user, DTOs, etc).

6. Write isolated tests with mocked dependencies.

Choose between **feature-based** or **layer-based** organization — both are valid.

## 9 — API Endpoints (Summary)

**Auth**

* `POST /api/auth/register`

* `POST /api/auth/login`

* `POST /api/auth/refresh`

* `POST /api/auth/logout`

**Jobs**

* `POST /api/jobs`

* `GET /api/jobs`

* `GET /api/jobs/:id`

* `PUT /api/jobs/:id`

* `DELETE /api/jobs/:id`

**Applications**

* `POST /api/applications`

* `GET /api/applications/job/:id`

* `PATCH /api/applications/:id/status`

**AI**

* `POST /api/ai/generate-job-description`

* `POST /api/ai/match-resume`

* `POST /api/ai/interview-questions`

**Analytics**

* `GET /api/analytics`

## 10 — Testing & CI/CD Details

* Unit tests for services.

* Integration tests using `Supertest` + `mongodb-memory-server`.

* GitHub Actions workflow runs `lint` + `test` on PR.

* Husky pre-commit hooks prevent bad commits.

## 11 — Security & Production Notes

* Never commit .env.

* Use HTTPS and TLS for DB & Redis.

* Rotate refresh tokens.

* Rate-limit sensitive endpoints.

* Validate and sanitize all inputs.

* Log with Winston/Pino and monitor via APM tools.

* Automate MongoDB backups.

## 12 — Further Reading & Learning Path

* Auth0 — JWT Best Practices

* OWASP — Security Guidelines

* Mongoose Aggregation Docs

* Redis Best Practices

* OpenAI vs Ollama Comparison

* Production Node.js Setup